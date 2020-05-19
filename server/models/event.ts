import { NextFunction } from "express";
import bcrypt from "bcrypt";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  eventSchema = new Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String,
    password: String
  });

eventSchema.pre("save", async function(this: any, next: NextFunction) {
  let hashed_password = await bcrypt.hashSync(this.password, 10);
  this.password = hashed_password;
  next();
});

module.exports = mongoose.model("event", eventSchema);