import { useState } from "react";
import axios from "axios";
import "./style1.css";

function Signup() {
  const [SignUpstatus, setSignUpstatus] = useState("");

  function handlesignformsubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    let user = {};

    for (let [key, value] of formData.entries()) {
      user[key] = value;
    }

    user["role"] = "user";
    checkUserExist(user);
  }

  function checkUserExist(user) {
    axios.get("http://localhost:3000/users").then((response) => {
      let data = response.data;
      let filterData = data.filter((e) => e.email === user.email);

      if (filterData.length >= 1) {
        setSignUpstatus("User already exists!");
      } else {
        addUser(user);
      }
    });
  }

  function addUser(user) {
    axios.post("http://localhost:3000/users", user).then(() => {
      setSignUpstatus("Signed up successfully!");
    });
  }

  return (
    <div
      style={{
        backgroundImage: "url('Originals/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="signup-container">
        <form onSubmit={handlesignformsubmit} className="signup-form">
          <h2>Signup</h2>
          <div className=" p-4 w-50">
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="bg-white text-danger"
                required
              />
            </div>
            <br />
            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="bg-white text-danger"
                required
              />
            </div>
            <br />
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="bg-white text-danger"
                required
              />
            </div>
            <br />
            <button className="bg-danger">Sign Up</button>
            {SignUpstatus && (
              <div
                style={{
                  color: SignUpstatus.includes("successfully")
                    ? "green"
                    : "red",
                }}
              >
                {SignUpstatus}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
