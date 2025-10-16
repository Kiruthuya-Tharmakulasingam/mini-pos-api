import Sale from "../models/Sale.js";

// Get all sales with populate
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("customer", "name email")
      .populate("items.item", "name price");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sale by ID
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("customer", "name")
      .populate("items.item", "name");
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create sale
export const createSale = async (req, res) => {
  try {
    const { customer, items, status } = req.body;

    // Calculate total
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const newSale = new Sale({ customer, items, total, status });
    const savedSale = await newSale.save();

    res
      .status(201)
      .json({ message: "Sale created successfully", sale: savedSale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const { customer, items, status } = req.body;

    let updatedData = { status };

    if (items) {
      const formattedItems = items.map((i) => ({
        item: new mongoose.Types.ObjectId(i.item),
        quantity: i.quantity,
        price: i.price,
      }));

      const total = formattedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      updatedData.items = formattedItems;
      updatedData.total = total;
    }

    if (customer) {
      updatedData.customer = new mongoose.Types.ObjectId(customer);
    }

    const updatedSale = await Sale.findByIdAndUpdate(saleId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    res.status(200).json({
      message: "Sale updated successfully",
      sale: updatedSale,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
