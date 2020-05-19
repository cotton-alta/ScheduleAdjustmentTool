const mongoose = require("mongoose"),
  { Schema } = mongoose,
  eventSchema = new Schema({
    title: String,
    description: String,
    startDate: String,
    endDate: String
  });

module.exports = mongoose.model("event", eventSchema);