const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BookingSchema = new Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
    booking_date: { type: Schema.Types.String, required: true },
    booking_start: { type: Schema.Types.String, required: true },
    booking_end: { type: Schema.Types.String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = BookingSchema;