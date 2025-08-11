import React, { useState } from 'react';

// The onSearch prop is added to handle the search functionality
function Navbar(props) {
  const setPage = (view) => props.onSetPage(view);
  
  // State to manage the text inside the search bar
  const [searchQuery, setSearchQuery] = useState('');

  // This function runs every time you type in the search bar
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // This sends the search text up to your Ecomm component
    props.onSearch(e.target.value); 
  };

  return (
    <nav
      className="navbar px-3 py-3"
      style={{
        // Sticky properties to keep it at the top
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        // Original styling restored
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: "url('/public/Originals/navbar4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100px",
        rowGap: "15px",
      }}
    >
      {/* Logo */}
      <div>
        <img
          src="/logo/2.png"
          alt="Shop Logo"
          onClick={() => setPage("home")}
          className="img-fluid"
          style={{ height: "120px", cursor: "pointer" }}
        />
      </div>

      {/* Navigation Links */}
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        <button
          className="btn btn-light px-3 py-2 fs-6"
          onClick={() => setPage("home")}
        >
          Home
        </button>

        {!props.user && (
          <>
            <button
              className="btn btn-light px-3 py-2 fs-6"
              onClick={() => setPage("login")}
            >
              Login
            </button>
            <button
              className="btn btn-light px-3 py-2 fs-6"
              onClick={() => setPage("signup")}
            >
              Signup
            </button>
          </>
        )}

        <button
          className="btn btn-light px-3 py-2 fs-6"
          onClick={() => setPage("chatBot")}
        >
          ChatBot 🤖
        </button>
      </div>
      
      {/* --- SEARCH BAR ADDED HERE --- */}
      <div className="d-flex align-items-center" style={{ minWidth: '250px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search for fruits..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* User Info & Cart */}
      <div className="d-flex align-items-center gap-3 flex-wrap">
        {props.user && (
          <div className="d-flex align-items-center gap-2 text-white">
            <span className="fs-6">Welcome, {props.user.name}</span>
            <button
              className="btn btn-danger px-3 py-1 fs-6"
              onClick={props.onLogoutClick}
            >
              Logout
            </button>
          </div>
        )}

        {/* Cart */}
        <div
          className="position-relative d-flex align-items-center"
          onClick={() => setPage("cart")}
          style={{ cursor: "pointer" }}
        >
          <i
            className="bi bi-cart-check text-white"
            style={{ fontSize: "36px" }}
          ></i>
          {props.cartItemCount > 0 && (
            <>
              <span className="position-absolute top-0 start-100 translate-middle bg-danger text-white rounded-circle px-2 fs-6">
                {props.cartItemCount}
              </span>
              <span className="text-white fw-bold ms-2 fs-6">
                ₹ {props.totalPrice.toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;