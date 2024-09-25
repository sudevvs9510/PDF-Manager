import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import pdfRoutes from './routes/pdfRoutes.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());


connectDB();

// Route handling
app.use('/user', userRoutes);
app.use('/pdf', pdfRoutes);

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
