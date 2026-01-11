const mysql = require("mysql2");

// Use environment variables when available; fallback to local defaults
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "brevia",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
  queueLimit: Number(process.env.DB_QUEUE_LIMIT || 0)
};

const pool = mysql.createPool(dbConfig);

// Optional: verify connectivity on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err.message);
    console.error("Config used:", { ...dbConfig, password: "***" });
    // Do not exit here; allow server to start and retry later if desired
  } else {
    console.log("MySQL connected");
    connection.release();
  }
});

// Initialize database schema (tables) if they don't exist
const initSchema = async () => {
  const createProducts = `
    CREATE TABLE IF NOT EXISTS products (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      category VARCHAR(100),
      image VARCHAR(255),
      customization JSON
    ) ENGINE=InnoDB;
  `;

  const createOrders = `
    CREATE TABLE IF NOT EXISTS orders (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      items JSON NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      deliveryFee DECIMAL(10,2) NOT NULL,
      paymentMethod VARCHAR(50),
      address VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;

  const createReviews = `
    CREATE TABLE IF NOT EXISTS reviews (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      productId VARCHAR(64) NOT NULL,
      rating INT NOT NULL,
      comment TEXT,
      reviewerName VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;

  const createProductSold = `
    CREATE TABLE IF NOT EXISTS product_sold (
      _id INT AUTO_INCREMENT PRIMARY KEY,
      productsoldname VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      customerName VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;

  try {
    await pool.promise().query(createProducts);
    await pool.promise().query(createOrders);
    await pool.promise().query(createReviews);
    // Ensure reviewerName column exists even if table was created before this change
    const [revCol] = await pool.promise().query(
      "SELECT COUNT(*) AS cnt FROM information_schema.columns WHERE table_schema = ? AND table_name = 'reviews' AND column_name = 'reviewerName'",
      [dbConfig.database]
    );
    if ((revCol[0]?.cnt ?? 0) === 0) {
      try {
        await pool.promise().query(
          "ALTER TABLE reviews ADD COLUMN reviewerName VARCHAR(255)"
        );
        console.log("Added 'reviewerName' column to reviews");
      } catch (e) {
        console.warn("Could not add 'reviewerName' column:", e.message);
      }
    }
    await pool.promise().query(createProductSold);
    // Ensure price column exists even if table was created before this change (compatible with older MySQL)
    const dbName = dbConfig.database;
    const [rows] = await pool.promise().query(
      "SELECT COUNT(*) AS cnt FROM information_schema.columns WHERE table_schema = ? AND table_name = 'product_sold' AND column_name = 'price'",
      [dbName]
    );
    if ((rows[0]?.cnt ?? 0) === 0) {
      try {
        await pool.promise().query(
          "ALTER TABLE product_sold ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT 0"
        );
        console.log("Added 'price' column to product_sold");
      } catch (alterErr) {
        console.warn("Could not add 'price' column:", alterErr.message);
      }
    }
    console.log("MySQL tables ensured (products, orders, reviews, product_sold)");
  } catch (e) {
    console.error("Error ensuring MySQL tables:", e.message);
  }
};

// Run schema initialization once at startup
initSchema();

module.exports = pool;
