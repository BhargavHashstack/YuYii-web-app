import mongoose from "mongoose";


const hubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
});

const Hub = mongoose.model("Hub", hubSchema);

export default Hub;
