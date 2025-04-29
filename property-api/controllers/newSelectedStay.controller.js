import NewSelectedStay from "../models/NewSelectedStay.model.js";

// @desc    Get all stays
// @route   GET /property-api/newselectedstay
// @access  Public
export const getAllStays = async (req, res, next) => {
  try {
    const stays = await NewSelectedStay.find({});
    res.status(200).json({ success: true, data: stays });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a stay by ID
// @route   GET /property-api/newselectedstay/:id
// @access  Public
export const getStayById = async (req, res, next) => {
  try {
    const stay = await NewSelectedStay.findById(req.params.id);
    if (!stay) {
      return res.status(404).json({ success: false, message: "Stay not found" });
    }
    res.status(200).json({ success: true, data: stay });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new stay
// @route   POST /property-api/newselectedstay
// @access  Public
export const createStay = async (req, res, next) => {
  try {
    const newStay = new NewSelectedStay(req.body);
    await newStay.save();
    res.status(201).json({ success: true, data: newStay });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a stay
// @route   PUT /property-api/newselectedstay/:id
// @access  Public
export const updateStay = async (req, res, next) => {
  try {
    const updatedStay = await NewSelectedStay.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStay) {
      return res.status(404).json({ success: false, message: "Stay not found" });
    }
    res.status(200).json({ success: true, data: updatedStay });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a stay
// @route   DELETE /property-api/newselectedstay/:id
// @access  Public
export const deleteStay = async (req, res, next) => {
  try {
    const deletedStay = await NewSelectedStay.findByIdAndDelete(req.params.id);
    if (!deletedStay) {
      return res.status(404).json({ success: false, message: "Stay not found" });
    }
    res.status(200).json({ success: true, message: "Stay deleted successfully" });
  } catch (error) {
    next(error);
  }
};
