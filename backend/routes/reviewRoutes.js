const router = require("express").Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { productId, rating, comment, reviewerName } = req.body;

  db.query(
    "INSERT INTO reviews (productId, rating, comment, reviewerName) VALUES (?, ?, ?, ?)",
    [productId, rating, comment, reviewerName],
    (err, result) => {
      if (err) return res.json(err);
      res.json({ message: "Review added" });
    }
  );
});

router.get("/:productId", (req, res) => {
  db.query(
    "SELECT * FROM reviews WHERE productId = ?",
    [req.params.productId],
    (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    }
  );
});

module.exports = router;

