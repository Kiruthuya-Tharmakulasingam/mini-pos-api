import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

connectDB();
//Use Routes
app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/sales", saleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
