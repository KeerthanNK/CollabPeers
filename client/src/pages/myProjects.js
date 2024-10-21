import React, { useState, useEffect } from "react";
import MyProjectsCards from "../cards-dir/MyprojectsCards";
import axios from "axios";

const MyProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/project/my-project", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data); 
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        console.error("Error : ", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // If response.data contains the "getAll" key, use it, otherwise use an empty array
  const myProject_data = data.getAll || [];
  console.log(myProject_data);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {!loading && !error && myProject_data.length > 0 ? (
        myProject_data.map((element, index) => (
          <MyProjectsCards 
            key={index}
            college_name={element.collegename}
            project_name={element.projectname} 
            description={element.description} 
            year={element.year} 
            slots={element.availableSlots} 
            roles={element.roles}
            id = {element._id}
          />
        ))
      ) : (
        <p>No projects found</p>
      )}
    </>
  );
};

export default MyProjects;
