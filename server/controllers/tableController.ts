import express from 'express';

export const getEvent = (req: express.Request, res: express.Response) => {
  res.send("Hello express!");
};

export const createEvent = (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.send("create event!");
};