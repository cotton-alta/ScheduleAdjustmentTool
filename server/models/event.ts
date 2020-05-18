const mongoose = require("mongoose"),
  { Schema } = mongoose,
  eventSchema = new Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String
  });

export const Event = mongoose.model("event", eventSchema);