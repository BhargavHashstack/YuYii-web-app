// models/propertyType.js

import mongoose from 'mongoose';

// Define the schema for Property Type
const propertytypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the PropertyType model using the schema
const Propertytype = mongoose.model('PropertyType', propertytypeSchema);

export default Propertytype;
