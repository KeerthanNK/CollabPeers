import React, { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      console.log(response.data);
      if (response.status === 201) {
        window.alert("Login Successful");
        
        // Store the token in a cookie
        localStorage.setItem("token", Data.token);

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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Signin;
