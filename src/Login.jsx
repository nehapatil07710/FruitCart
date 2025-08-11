import axios from "axios";
import { useState } from "react";
import "./style1.css";

function Login({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("");

  function handleChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let { data } = await axios.get("http://localhost:3000/users");
      let user = data.find(
        (u) => u.email === loginForm.email && u.password === loginForm.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
      } else {
        setLoginStatus("Wrong credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginStatus("Login service is unavailable.");
    }
  }

  return (
    <div
      style={{
        backgroundImage: "url('Originals/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-container">
        <form
          onSubmit={handleSubmit}
          className="login-form"
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: "450px"
          }}
        >
          <h2 className="text-white mb-4">Login</h2>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="form-control bg-white text-danger"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="form-control bg-white text-danger"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3 text-white">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
              />
              <label className="form-check-label text-danger" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className=" text-decoration-none text-danger">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-danger w-100 text-white">
            Login
          </button>

          {loginStatus && (
            <div className="text-danger mt-3">{loginStatus}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;