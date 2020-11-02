import express from "express";
import bcrypt from "bcrypt";
const Event = require("../models/event");

const checkPassword = (req: express.Request, res: express.Response) => {
  Event.findById(req.params.event)
  .then((result: any) => {
    let auth = bcrypt.compareSync(req.body.password, result.password);
    res.send({ auth, password: result.password });
  });
};

const checkHashedPassword = (req: express.Request, res: express.Response) => {
  Event.findById(req.params.event)
  .then((result: any) => {
    if(req.body.password === result.password) {
      res.send({ auth: true, password: "" });
    } else {
      res.send({ auth: false, password: "" });
    }
  });
};

const checkHostPassword = (req: express.Request, res: express.Response) => {
  console.log(req.params.event);
  console.log(req.body);
  Event.findById(req.params.event)
  .then((result: any) => {
    let auth = bcrypt.compareSync(req.body.hostPassword, result.hostPassword);
    res.send({ auth });
  });
};

const getEvent = (req: express.Request, res: express.Response) => {
  Event.findById(req.params.event)
  .then((result: any) => {
    res.send(result);
  })
  .catch((err: any) => {
    res.send("No data");
  });
};

const createEvent = (req: express.Request, res: express.Response) => {
  let newEvent = new Event({
    title:        req.body.title,
    description:  req.body.description,
    startDate:    req.body.startDate,
    endDate:      req.body.endDate,
    password:     req.body.password,
    hostPassword: req.body.hostPassword,
    user:         [],
    decisionDate: {
      judge: false,
      date: ""
    }
  });

  newEvent.save((err: any) => {
    if(err) {
      console.log(err);
    }
    res.send(newEvent);
  });
};

const joinEvent = (req: express.Request, res: express.Response) => {
  Event.findOneAndUpdate(
    { _id: req.params.event },
    { user: req.body }
  )
  .then((result: any) => {
    res.send(result);
  });
};

const decisionEvent = (req: express.Request, res: express.Response) => {
  console.log(`${req.params.event} is decision`);
  console.log(req.body)
  Event.findOneAndUpdate(
    { _id: req.params.event },
    { $set: {
      decisionDate: {
        judge: true,
        date: req.body.date
      }
    }}
  )
  .then((result: any) => {
    console.log(result)
  })
  res.send("decision");
};

export {
  checkPassword,
  checkHashedPassword,
  checkHostPassword,
  getEvent,
  createEvent,
  joinEvent,
  decisionEvent
}
