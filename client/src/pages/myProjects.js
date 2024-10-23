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
            technology = {element.technology}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">No  Projects found</h1>
            <p className="mt-4 text-lg text-gray-600">It looks like you haven't added any projects yet.</p>
            <a 
              href="/new-project" 
              className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              Add projects
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProjects;
