const router = require("express").Router();
const db = require("../config/db");

router.post("/add-product", (req, res) => {
  const { name, price, category } = req.body;
  db.query(
    "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
    [name, price, category],
    (err, result) => {
      if (err) return res.json(err);
      res.json({ message: "Product added" });
    }
  );
});

module.exports = router;
