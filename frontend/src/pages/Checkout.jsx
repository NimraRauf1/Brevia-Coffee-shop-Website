import React from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();
  const location = useLocation();
  const productsoldname = location.state?.productsoldname || (cart[0]?.name ?? "");
  const price = location.state?.price ?? (cart[0]?.price ?? 0);

  const [form, setForm] = React.useState({
    customerName: "",
    address: "",
    phone: "",
    email: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!productsoldname || !form.customerName || !form.address || !form.phone || !form.email) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/productsold", {
        productsoldname,
        price,
        customerName: form.customerName,
        address: form.address,
        phone: form.phone,
        email: form.email,
      });
      alert("Thank you! Your purchase was recorded.");
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Checkout</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Product</label>
              <input type="text" className="form-control" value={productsoldname} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Price (Rs)</label>
              <input type="number" className="form-control" value={price} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="customerName" type="text" className="form-control" value={form.customerName} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input name="address" type="text" className="form-control" value={form.address} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input name="phone" type="tel" className="form-control" value={form.phone} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" value={form.email} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
