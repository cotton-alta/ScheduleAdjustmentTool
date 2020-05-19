import express from "express";
const Event = require("../models/event");

export const getEvent = (req: express.Request, res: express.Response) => {
  console.log(req.params.event);
  // Event.findById(req.params.event)
  Event.find({})
  .then((result: any) => {
    console.log(result);
    res.send(result);
  })
};

export const createEvent = (req: express.Request, res: express.Response) => {
  console.log(req.body);
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    password: req.body.password
  });

  newEvent.save((err: any) => {
    if(err) {
      console.log(err);
    }
    res.send("create event!");
  })
};