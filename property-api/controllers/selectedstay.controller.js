// controllers/selectedstay.controller.js
import SelectedStay from '../models/SelectedStay.js';

export const getSelectedStay = async (req, res, next) => {
  try {
    const { id } = req.params; // expecting the document _id
    const selectedStay = await SelectedStay.findById(id);
    if (!selectedStay) {
      return res.status(404).json({ message: 'Selected Stay not found' });
    }
    return res.json(selectedStay);
  } catch (error) {
    next(error);
  }
};
