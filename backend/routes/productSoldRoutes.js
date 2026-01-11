const router = require("express").Router();
const ProductSold = require("../models/ProductSold");

// POST /api/productsold
router.post("/", async (req, res) => {
  const { productsoldname, price, customerName, address, phone, email } = req.body;
  if (!productsoldname || price == null || !customerName || !address || !phone || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const created = await ProductSold.add({ productsoldname, price, customerName, address, phone, email });
    res.json({ message: "Product sold recorded", id: created._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/productsold
router.get("/", async (_req, res) => {
  try {
    const rows = await ProductSold.list();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

