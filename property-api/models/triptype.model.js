// models/tripType.model.js
import mongoose from 'mongoose';

const triptypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Triptype = mongoose.model('Triptype', triptypeSchema);
export default Triptype;