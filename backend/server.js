const express = require("express");
const cors = require("cors");

require("./config/db");

const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productSoldRoutes = require("./routes/productSoldRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/productsold", productSoldRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

