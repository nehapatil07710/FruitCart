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
    let { data } = await axios.get("http://localhost:3000/users");
    let user = data.find(
      (u) => u.email == loginForm.email && u.password == loginForm.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
    } else {
      setLoginStatus("Wrong credentials!");
    }
  }

  return (
    <div
      
      style={{
        backgroundImage:
          "url('Originals/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="login-container">
        <form
          onSubmit={handleSubmit} className="login-form"
          style={{ textAlign: "center", marginTop: "50px",padding:"60px" }}
        >
          <h2>Login</h2>
          
            <div className=" p-4 w-50 ">
            <div >
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                className="bg-white text-danger"
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="bg-white text-danger"
                onChange={handleChange}
              />
            </div>
            <div class="forget">
              <label for="remember">
                <input type="checkbox" id="remember" />
                <p>Remember me</p>
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <br />
            <button className="bg-danger btn text-white">Login In</button>
            {loginStatus && <div className="text-danger">{loginStatus}</div>}
          </div>
        
        </form>
      </div>
    </div>
  );
}

export default Login;
