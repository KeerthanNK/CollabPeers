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
       <div className="flex flex-col items-center">
        <div className="flex-row justify-center gap-6 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className='flex flex-row'>
        <div className='flex flex-col w-[200px] h-[200px] border-solid border-2 border-indigo-600'>
        <div className='flex justify-center gap-4'>
            <div>Add project</div>
        </div>
          <div className='flex-grow flex justify-center items-center'>
            <div>plus symbol</div>
          </div>
        </div>
        </div>
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
          </div>
        </div>
     
      )} 
      </div>
      </div>
    </>
  );
};

export default MyProjects;
