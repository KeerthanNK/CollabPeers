import mongoose from "mongoose";

const projSchema = new mongoose.Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableSlots: {
      type: Number,
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    collegename: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    searchingFor: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Proj = mongoose.model("project", projSchema);
export default Proj;
