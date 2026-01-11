import { NavLink } from "react-router-dom";
import Menu from "./menu";

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#6f4e37" }}>
        <div className="container">
          <NavLink className="navbar-brand text-white" to="/">Brèvia</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-3 align-items-center">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">Menu</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/orders">Orders</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/reviews">Reviews</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/admin">Admin</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Menu />
      </div>
    </>
  );
}

