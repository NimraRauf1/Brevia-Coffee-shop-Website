const db = require("../config/db");

module.exports = {
  add: async ({ productsoldname, price, customerName, address, phone, email }) => {
    const sql = `INSERT INTO product_sold (productsoldname, price, customerName, address, phone, email)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [productsoldname, price, customerName, address, phone, email];
    try {
      const [result] = await db.promise().query(sql, params);
      return { _id: result.insertId };
    } catch (err) {
      throw err;
    }
  },
  list: async () => {
    try {
      const [rows] = await db.promise().query(
        "SELECT _id, productsoldname, price, customerName, address, phone, email, createdAt FROM product_sold ORDER BY createdAt DESC"
      );
      return rows;
    } catch (err) {
      throw err;
    }
  },
};