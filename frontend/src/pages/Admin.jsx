import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category) {
      alert("Please fill out all fields.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/admin/add-product", {
        name,
        price: Number(price),
        category
      });
      alert("Product added successfully");
      setName("");
      setPrice("");
      setCategory("");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#6f4e37" }}
            >
              Add Product
            </div>
            <div className="card-body">
              <form onSubmit={addProduct}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Latte"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price (Rs)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g., 500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Bakery">Shake</option>
                    <option value="Bakery">Cake</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#6f4e37", color: "#fff", borderColor: "#6f4e37" }}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
