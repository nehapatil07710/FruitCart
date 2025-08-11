import axios from "axios";
import { useEffect, useState } from "react";
import AdminMainPage from "./AdminMainPage";
import Login from "./Login";
import Navbar from "./Navbar";
import ProductsPage from "./Productpage";
import Signup from "./Signup";
import CartList from "./CartList";
import Bill from "./Bill";
import ChatBot from "./ChatBot";
import SearchPage from "./Searchpage";
import Footer from "./Footer";       

export default function Ecomm() {
  const [productList, setProductList] = useState([]);
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    getDataFromServer();
    checkUserExist();
  }, []);

  async function getDataFromServer() {
    try {
      const response = await axios("http://localhost:3000/fruits");
      const list = response.data.map((item) => ({ ...item, qty: 0 }));
      setProductList(list);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function checkUserExist() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }

  function handleLogin(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setView("home");
  }

  function handleLogoutClick() {
    localStorage.removeItem("user");
    setUser(null);
    setView("home");
  }

  function showCart() {
    setView("cart");
  }

  function handleAddToCart(index) {
    const updatedProducts = [...productList];
    if (updatedProducts[index].inStock && updatedProducts[index].qty === 0) {
      updatedProducts[index].qty = 1;
    }
    setProductList(updatedProducts);
    updateCart(updatedProducts);
  }

  function handleIncrement(index) {
    const updatedProducts = [...productList];
    if (updatedProducts[index].inStock) {
      updatedProducts[index].qty += 1;
    }
    setProductList(updatedProducts);
    updateCart(updatedProducts);
  }

  function handleDecrement(index) {
    const updatedProducts = [...productList];
    if (updatedProducts[index].qty > 0) {
      updatedProducts[index].qty -= 1;
    }
    setProductList(updatedProducts);
    updateCart(updatedProducts);
  }

  function updateCart(updatedProducts) {
    const cart = updatedProducts.filter((item) => item.qty > 0);
    setCartItems(cart);
  }

  function handleBuy() {
    alert("Thank you for your purchase!");
    const clearedProducts = productList.map((item) => ({ ...item, qty: 0 }));
    setProductList(clearedProducts);
    setCartItems([]);
    setView("home");
  }

  function handleBillClick() {
    setView("bill");
  }

  // New handler for search
  function handleSearch(query) {
    setSearchQuery(query);
  }

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + (item.mrp - (item.mrp * item.discount) / 100) * item.qty,
    0
  );

  const billItems = cartItems.map((item) => ({
    ...item,
    finalprice: (item.mrp - (item.mrp * item.discount) / 100).toFixed(2),
  }));

  const price = totalPrice.toFixed(2);
  const name = user ? user.name : "Guest";

  // Function to render the main content
  const renderContent = () => {
    if (searchQuery) {
      return (
        <SearchPage
          productList={productList}
          searchQuery={searchQuery}
          handleAddToCart={handleAddToCart}
          handleIncrementQuantity={handleIncrement}
          handleDecrementQuantity={handleDecrement}
        />
      );
    }

    switch (view) {
      case "home":
        return (
          <ProductsPage
            productList={productList}
            handleAddToCart={handleAddToCart}
            handleIncrementQuantity={handleIncrement}
            handleDecrementQuantity={handleDecrement}
          />
        );
      case "cart":
        return (
          <CartList
            cartItems={cartItems}
            totalPrice={totalPrice}
            onbuttonincrement={handleIncrement}
            onbuttondecrement={handleDecrement}
            onhandlebuybtn={handleBuy}
            onhandlebillbutton={handleBillClick}
          />
        );
      case "login":
        return <Login onLogin={handleLogin} />;
      case "signup":
        return <Signup />;
      case "AdminMainPage":
        return <AdminMainPage />;
      case "chatBot":
        return <ChatBot />;
      case "bill":
        return <Bill price={price} name={name} cartItems={billItems} />;
      default:
        return <h2>Page not found</h2>;
    }
  };

  return (
    <div>
      <Navbar
        onSetPage={setView}
        user={user}
        onLogoutClick={handleLogoutClick}
        onclickimageicon={showCart}
        cartItemCount={cartItemCount}
        totalPrice={totalPrice}
        onSearch={handleSearch} // Pass the handler to Navbar
      />

      <div style={{ minHeight: 'calc(100vh - 200px)' }}> {/* Ensures footer doesn't overlap content */}
        {renderContent()}
      </div>

      <Footer /> 
    </div>
  );
}