import { Schema, model } from "mongoose";

const instrumentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["guitar", "amp", "pedal"],
    },
    year: {
      type: Number,
    },
    finish: {
      type: String,
      trim: true,
    },
    serialNumber: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    photoUrls: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      enum: ["not_for_sale", "for_sale", "open_to_trade"],
      default: "not_for_sale",
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Instrument", instrumentSchema);
