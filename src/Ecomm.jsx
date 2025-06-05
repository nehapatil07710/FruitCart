import axios from "axios";
import { useEffect, useState } from "react";
import AdminMainPage from "./AdminMainPage";
import Login from "./Login";
import Navbar from "./Navbar";
import ProductsPage from "./Productpage";
import Signup from "./signup";
import CartList from "./CartList";
import Bill from "./Bill";

export default function Ecomm() {
  const [productList, setProductList] = useState([]);
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <div>
      <Navbar
        onSetPage={setView}
        user={user}
        onLogoutClick={handleLogoutClick}
        onclickimageicon={showCart}
        cartItemCount={cartItemCount}
        totalPrice={totalPrice}
      />

      <div>
        {view === "home" && (
          <ProductsPage
            productList={productList}
            handleAddToCart={handleAddToCart}
            handleIncrementQuantity={handleIncrement}
            handleDecrementQuantity={handleDecrement}
          />
        )}

        {view === "cart" && (
          <CartList
            cartItems={cartItems}
            totalPrice={totalPrice}
            onbuttonincrement={(index) => handleIncrement(index)}
            onbuttondecrement={(index) => handleDecrement(index)}
            onhandlebuybtn={handleBuy}
            onhandlebillbutton={handleBillClick}
          />
        )}

        {view === "login" && <Login onLogin={handleLogin} />}
        {view === "signup" && <Signup />}
        {view === "AdminMainPage" && <AdminMainPage />}

        {view === "bill" && (
          <Bill price={price} name={name} cartItems={billItems} />
        )}
      </div>
    </div>
  );
}
