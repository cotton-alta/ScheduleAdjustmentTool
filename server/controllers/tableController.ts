import express from 'express';

export const getEvent = (req: express.Request, res: express.Response) => {
  res.send("Hello express!");
};