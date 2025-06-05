import ProductsPage from "./Productpage";

function Navbar({ user, cartItemCount, totalPrice, onSetPage, onLogoutClick }) {
  function setPage(view) {
    onSetPage(view);
  }

  return (
    <nav
      className="navbar px-5"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: "url('/public/Originals/navbar4.jpg')",
        backgroundSize: "cover",
        height: "150px", // BIG NAVBAR (Not too much)
        padding: "30px 40px", // Comfortable spacing
      }}
    >
      {/* Logo */}
      <div>
        <img
          src="/logo/shop_logo.jpg"
          onClick={() => setPage("home")}
          className="img-fluid"
          alt="Shop Logo"
          style={{ height: "80px", cursor: "pointer" }} // Medium Logo
        />
      </div>

      {/* Navigation Links */}
      <div>
        <button
          className="btn btn-light mx-3 px-4 py-2 fs-5"
          onClick={() => setPage("home")}
        >
          Home
        </button>
        {!user && (
          <>
            <button
              className="btn btn-light mx-3 px-4 py-2 fs-5"
              onClick={() => setPage("login")}
            >
              Login
            </button>
            <button
              className="btn btn-light mx-3 px-4 py-2 fs-5"
              onClick={() => setPage("signup")}
            >
              Signup
            </button>
          </>
        )}
      </div>

      {/* User Info & Logout */}
      {user && (
        <div className="text-white d-flex align-items-center">
          <span className="me-3 fs-5">Welcome, {user.name}</span>
          <button
            className="btn btn-danger px-4 py-2 fs-5"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </div>
      )}

      {/* Cart Icon & Total Price */}
      <div
        className="position-relative d-flex align-items-center"
        onClick={() => setPage("cart")}
        style={{ cursor: "pointer" }}
      >
        <i
          className="bi bi-cart-check text-white"
          style={{ fontSize: "50px" }}
        ></i>{" "}
        {/* Bigger Cart Icon */}
        {/* Cart count badge */}
        {cartItemCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle bg-danger text-white rounded-circle px-3 fs-6">
            {cartItemCount}
          </span>
        )}
        {/* Total Price */}
        {cartItemCount > 0 && (
          <span className="text-white fw-bold ms-3 fs-5">₹ {totalPrice}</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
