import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

connectDB();
//Use Routes
app.use("/api/customers", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
