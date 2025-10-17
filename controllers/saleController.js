import Sale from "../models/Sale.js";

// Get all sales
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find(); // Fetch all sales from DB
    res.status(200).json({ success: true, sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get single sale by ID
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale)
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    res.status(200).json({ success: true, sale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Create a new sale
export const createSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json({ success: true, sale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Update a sale
export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sale)
      return res
        .status(404)
        .json({ success: false, message: "Sale not found" });
    res.status(200).json({ success: true, sale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete sale
export const deleteSale = async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Sale not found" });
    res
      .status(200)
      .json({ message: "Sale deleted successfully", sale: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
