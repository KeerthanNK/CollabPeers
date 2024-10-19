import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    collegename: "",
    year: "",
    course: "",
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
        "http://localhost:8000/api/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response.data);
      
      // Navigate to the home page on successful registration
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.error("Backend responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
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
        <label>Confirm Password:</label>
        <input
          type="password"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>College Name:</label>
        <input
          type="text"
          name="collegename"
          value={formData.collegename}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Course:</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Signup;
