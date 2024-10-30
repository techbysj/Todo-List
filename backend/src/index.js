import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnect } from './db/dbconnect.js';
import { todoRouter } from './routes/todo.js';



// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbConnect();

//Routes
app.use('/todo',todoRouter);


// Root route
app.get('/', (req, res) => {
  res.json({ message: "Hello World" });
});

// Start server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
