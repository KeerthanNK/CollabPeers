import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", JSON.stringify(formData, null, 2));
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data);
      const Data = response.data;
      
      if (response.status === 201) {
        window.alert("Login Successful");

        // Store the token in localStorage
        localStorage.setItem("token", Data.token);

        // Navigate to the home page on successful login
        navigate("/");
      } else {
        window.alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error occurred during signin:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <p>Do not have an account? <a href="/register">Register</a></p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Signin;
