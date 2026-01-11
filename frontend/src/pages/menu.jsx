import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import img1 from "../assets/choco-cake.jpg";
import img2 from "../assets/cup-cake.jpg";
import img3 from "../assets/Donut.jpg";
import img4 from "../assets/Latte-recipe.jpg";
import img5 from "../assets/Cold-Coffee.png";
import img6 from "../assets/milkshake.jpg";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => setProducts(res.data));
  }, []);

  const staticImages = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="container mt-4">
    
      <div className="row g-3">
        {staticImages.map((src, idx) => (
          <div className="col-12 col-sm-6 col-md-4" key={idx}>
            <div className="card h-100">
              <img
                src={src}
                alt={`Product ${idx + 1}`}
                className="card-img-top"
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5 mb-3">Menu</h2>
      <div className="row g-3">
        {products.map((p) => (
          <div className="col-12 col-sm-6 col-md-4" key={p._id || `${p.name}-${p.price}`}> 
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-muted mb-1">{p.category}</p>
                <p className="card-text fw-bold">Rs {p.price}</p>
                <button
                  className="btn mt-auto"
                  style={{ backgroundColor: "#6f4e37", color: "#fff", borderColor: "#6f4e37" }}
                  onClick={() => {
                    addToCart(p);
                    navigate("/checkout", { state: { productsoldname: p.name, price: p.price } });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info">No products found. Add some from the Admin page.</div>
          </div>
        )}
      </div>
    </div>
  );
}

