import { NextFunction } from "express";
import bcrypt from "bcrypt";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  eventSchema = new Schema({
    title:        String,
    description:  String,
    startDate:    String,
    endDate:      String,
    password:     String,
    hostPassword: String,
    user: [{
      name:       String,
      possible:   [{type: String}],
      subtle:     [{type: String}],
      impossible: [{type: String}]
    }]
  });

eventSchema.pre("save", async function(this: any, next: NextFunction) {
  const hashed_password = await bcrypt.hashSync(this.password, 10);
  this.password = hashed_password;
  const hashed_host_password = await bcrypt.hashSync(this.hostPassword, 10);
  this.hostPassword = hashed_host_password;
  next();
});

module.exports = mongoose.model("event", eventSchema);