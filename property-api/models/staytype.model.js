// models/stayType.model.js
import mongoose from 'mongoose';

const staytypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Staytype = mongoose.model('Staytype', staytypeSchema);
export default Staytype ;