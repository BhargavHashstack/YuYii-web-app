import mongoose from 'mongoose';
import Property from '../models/property.model.js'; // Assuming you have a Property model

// Create property
export const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error: error.message });
  }
};

// Fetch all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties', error: error.message });
  }
};

// Update property by ID
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete property by ID
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting property', error: error.message });
  }
};

// Add property with file upload
export const addProperty = async (req, res) => {
  try {
    const { title, description, price, location } = req.body;

    // Access the uploaded file information
    const imagePath = req.file ? req.file.path : null;

    // Create a new property document
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      images: [imagePath], // Store the file path in the database
    });

    // Save to database
    await newProperty.save();

    res.status(201).json({ message: 'Property added successfully!', property: newProperty });
  } catch (error) {
    console.error('Error adding property:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching property' });
  }
};
