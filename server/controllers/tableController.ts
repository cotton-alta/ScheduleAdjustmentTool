import express from "express";
const Event = require("../models/event");

const getEvent = (req: express.Request, res: express.Response) => {
  console.log(req.params.event);
  // Event.findById(req.params.event)
  Event.findById(req.params.event)
  .then((result: any) => {
    console.log(result);
    res.send(result);
  })
};

const createEvent = (req: express.Request, res: express.Response) => {
  console.log(req.body);
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    password: req.body.password,
    user: []
  });

  newEvent.save((err: any) => {
    if(err) {
      console.log(err);
    }
    res.send(newEvent);
  });
};

const joinEvent = (req: express.Request, res: express.Response) => {
  console.log(req.params.event);
  console.log(req.body);
  Event.findOneAndUpdate(
    { _id: req.params.event },
    { user: req.body }
  )
  .then((result: any) => {
    // console.log(result);
    res.send(result);
  });
};

export {
  getEvent,
  createEvent,
  joinEvent
}