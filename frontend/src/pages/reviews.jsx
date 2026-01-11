import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
      if (res.data.length) {
        const first = res.data[0];
        const firstId = String(first._id ?? first.id ?? "");
        setSelectedProductId(firstId);
        setSelectedProductName(first.name || "");
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedProductId) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/reviews/${selectedProductId}`)
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  }, [selectedProductId]);

  const [reviewerName, setReviewerName] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    if (!selectedProductId || !reviewerName || !comment) {
      alert("Please select a product, add your name, and enter a comment.");
      return;
    }
    await axios.post("http://localhost:5000/api/reviews", {
      productId: selectedProductId,
      rating: Number(rating),
      comment,
      reviewerName,
    });
    setComment("");
    setReviewerName("");
    // Refresh reviews after submit
    const res = await axios.get(`http://localhost:5000/api/reviews/${selectedProductId}`);
    setReviews(res.data);
    alert("Review Submitted");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Reviews</h2>

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={submitReview}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Product</label>
                <select
                  className="form-select"
                  value={selectedProductId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedProductId(val);
                    const prod = products.find(
                      (p) => String(p._id ?? p.id) === val
                    );
                    setSelectedProductName(prod?.name || "");
                  }}
                >
                  {products.map((p) => (
                    <option key={p._id || p.id} value={String(p._id ?? p.id)}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reviewer Name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                />
              </div>
              <div className="col-md-8">
                <label className="form-label">Comment</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#6f4e37", color: "#fff", borderColor: "#6f4e37" }}
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Product Reviews {selectedProductName ? `for ${selectedProductName}` : ""}</div>
        <div className="card-body">
          {loading ? (
            <div className="text-muted">Loading...</div>
          ) : reviews.length === 0 ? (
            <div className="alert alert-info m-0">No reviews yet for this product.</div>
          ) : (
            <ul className="list-group list-group-flush">
              {reviews.map((rv, idx) => (
                <li key={rv._id || idx} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <strong>{selectedProductName || "Product"} • Rating: {rv.rating}</strong>
                    <span className="text-muted">
                      {rv.createdAt ? new Date(rv.createdAt).toLocaleString() : ""}
                    </span>
                  </div>
                  <div className="mt-1"><em>By:</em> {rv.reviewerName || "Anonymous"}</div>
                  <div>{rv.comment}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
