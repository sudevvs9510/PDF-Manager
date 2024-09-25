import PDFModel from "../models/pdfModel.js";

export const uploadPDF = async (req, res) => {
  console.log("upload pdf");
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const titles = req.body.titles; // Extract titles from the request body
    const userId = req.userId; // Extract the user ID from the request body

    console.log("Received titles:", titles);
    console.log("Received userId:", userId);

    // Check if any of the titles already exist in the database for the same user
    const existingFiles = await PDFModel.find({
      user: userId,
      filename: { $in: titles },
    });

    if (existingFiles.length > 0) {
      // If any title is already in use, send a response with a list of the conflicting titles
      const existingTitles = existingFiles.map((file) => file.filename);
      return res.status(409).json({
        message: "Some titles are already in use.",
        existingTitles,
      });
    }


    const files = req.files.map((file, index) => ({
      filename: titles[index],
      path: file.path,
      user: userId, // Associate the file with the user
    }));

    // Save file details to the MongoDB database
    await PDFModel.insertMany(files);

    return res
      .status(200)
      .json({ message: "Files uploaded successfully", files });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Error uploading files", error });
  }
};


// export const getPDF = async (req, res) => {
//   console.log("getpdf controller");
//   try {
//     const userId = req.params.userId;
//     console.log(userId);

//     const pdfs = await PDFModel.find({ user: userId });
//     console.log(pdfs);
//     if (pdfs.length === 0) {
//       return res.status(404).json({ message: "No PDFs found for this user" });
//     }

//     return res.status(200).json(pdfs);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Server error fetching PDFs" });
//   }
// };

export const getPDF = async (req, res) => {
  console.log("getPDF controller");
  try {
    const userId = req.params.userId;
    console.log("User ID:", userId);

    // Check if the userId is valid (you can add more validation logic if needed)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const pdfs = await PDFModel.find({ user: userId });

    console.log("Found PDFs:", pdfs);
    
    if (pdfs.length === 0) {
      return res.status(404).json({ message: "No PDFs found for this user." });
    }

    // Optionally select specific fields to return
    return res.status(200).json(pdfs);
  } catch (err) {
    console.error("Error fetching PDFs:", err);
    return res.status(500).json({ message: "Server error fetching PDFs." });
  }
};

