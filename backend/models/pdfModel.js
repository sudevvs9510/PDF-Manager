import mongoose from "mongoose";

const PDFSchema = new mongoose.Schema({
  filename: {
    type: String,
    required:true,
  },
  path: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const PDFModel = mongoose.model("pdf", PDFSchema);
export default PDFModel;
