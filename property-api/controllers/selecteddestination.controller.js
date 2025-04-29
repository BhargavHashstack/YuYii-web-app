// selecteddestination.controller.js

import SelectedDestination from "../models/selecteddestination.model.js";
import Destination         from "../models/destination.model.js";   // ← sync target

// GET /property-api/selecteddestinations/:id
export const getSelectedDestinationById = async (req, res) => {
  try {
    const param     = req.params.id;
    const numericId = Number(param);
    const query     = !isNaN(numericId)
      ? { id: numericId }
      : { name: { $regex: new RegExp(`^${param}$`, "i") } };

    const selectedDestination = await SelectedDestination.findOne(query);
    if (!selectedDestination) {
      return res.status(404).json({ message: "Selected destination not found" });
    }
    res.json(selectedDestination);
  } catch (error) {
    console.error("Error in getSelectedDestinationById:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET /property-api/selecteddestinations
export const getAllSelectedDestinations = async (req, res) => {
  try {
    const selectedDestinations = await SelectedDestination.find();
    res.json(selectedDestinations);
  } catch (error) {
    console.error("Error in getAllSelectedDestinations:", error);
    res.status(500).json({ message: error.message });
  }
};

// POST /property-api/selecteddestinations
export const addSelectedDestination = async (req, res) => {
  try {
    // 1) Create in selecteddestinations
    const newSel = await SelectedDestination.create(req.body);

    // 2) Build payload for Destination collection (mapping only the fields your schema requires) :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1} :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}
    const destPayload = {
      id:           String(newSel.id),
      title:        newSel.name,
      description:  newSel.description?.text || "",
      location:     newSel.state || "",
      image:        newSel.backgroundImage || "",
      activities:   newSel.activities || [],
      tripType:     newSel.tripTypes || [],    // if you store tripTypes
      amenities:    [],                        // fill as needed
      stayType:     "",                        // fill as needed
      imagehover:   [],                        // optional hover images
    };

    // 3) Upsert into destinations
    await Destination.findOneAndUpdate(
      { id: destPayload.id },
      destPayload,
      { upsert: true, new: true }
    );

    res.status(201).json(newSel);
  } catch (error) {
    console.error("Error in addSelectedDestination:", error);
    res.status(500).json({ message: error.message });
  }
};

// PUT /property-api/selecteddestinations/:id
export const updateSelectedDestination = async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const updatedSel = await SelectedDestination.findOneAndUpdate(
      { id: numericId },
      req.body,
      { new: true }
    );
    if (!updatedSel) {
      return res.status(404).json({ message: "Selected destination not found" });
    }

    // Mirror the update in Destination collection
    const destPayload = {
      id:           String(updatedSel.id),
      title:        updatedSel.name,
      description:  updatedSel.description?.text || "",
      location:     updatedSel.state || "",
      image:        updatedSel.backgroundImage || "",
      activities:   updatedSel.activities || [],
      tripType:     updatedSel.tripTypes || [],
      amenities:    [],
      stayType:     "",
      imagehover:   [],
    };

    await Destination.findOneAndUpdate(
      { id: destPayload.id },
      destPayload,
      { upsert: true, new: true }
    );

    res.json(updatedSel);
  } catch (error) {
    console.error("Error in updateSelectedDestination:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE /property-api/selecteddestinations/:id
export const deleteSelectedDestination = async (req, res) => {
  try {
    const numericId = Number(req.params.id);
    const deleted   = await SelectedDestination.findOneAndDelete({ id: numericId });
    if (!deleted) {
      return res.status(404).json({ message: "Selected destination not found" });
    }

    // Optionally remove from Destination as well:
    await Destination.findOneAndDelete({ id: String(numericId) });

    res.json({ message: "Destination deleted", deleted });
  } catch (error) {
    console.error("Error in deleteSelectedDestination:", error);
    res.status(500).json({ message: error.message });
  }
};
