import express from "express";
const Event = require("../models/event");

export const getEvent = (req: express.Request, res: express.Response) => {
  // Event.find({})
  // .then((result: any) => {
  //   console.log(result);
  //   res.send(result);
  // })
  res.send("result");
};

export const createEvent = (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.send("create event!");
};