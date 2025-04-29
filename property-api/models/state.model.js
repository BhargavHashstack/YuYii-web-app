// models/state.model.js
import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true, unique: true }
});

const State = mongoose.model("State", stateSchema);

export default State;
