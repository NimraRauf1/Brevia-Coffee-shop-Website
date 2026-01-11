import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productsold")
      .then((res) => setRows(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border">
        <div
          className="card-header text-white"
          style={{ backgroundColor: "#6f4e37" }}
        >
          Order History
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-muted">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="alert alert-info m-0">No orders yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead style={{ backgroundColor: "#6f4e37", color: "#fff" }}>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price (Rs)</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={r._id || idx}>
                      <td>{idx + 1}</td>
                      <td><strong>{r.productsoldname}</strong></td>
                      <td>
                        <span
                          className="badge"
                          style={{ backgroundColor: "#6f4e37", color: "#fff" }}
                        >
                          {Number(r.price).toLocaleString()}
                        </span>
                      </td>
                      <td>{r.customerName}</td>
                      <td>{r.phone}</td>
                      <td>{r.email}</td>
                      <td>{r.address}</td>
                      <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
