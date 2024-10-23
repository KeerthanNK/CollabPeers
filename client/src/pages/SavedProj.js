import React, { useEffect, useState } from 'react';
import SavedProjCards from '../cards-dir/SavedProjCards';
import axios from 'axios';

const SavedProj = () => {
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
          "http://localhost:8000/api/project/savedproject", 
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
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const saves = data.savedProjects || [];
  //console.log(saves);

  return (
    <>
      {loading && <p>Loading...</p>}
      
      {saves.length > 0 ? (
        saves.map((element, index) => (
          <SavedProjCards 
            key={index}
            id={element._id}
            college={element.collegename} 
            project={element.projectname} 
            year={element.year} 
            slots={element.availableSlots}
            roles={element.roles}
            technology={element.technology}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">No Saved Projects</h1>
            <p className="mt-4 text-lg text-gray-600">It looks like you haven't saved any projects yet.</p>
            <p className="mt-2 text-lg text-gray-600">Browse projects to find one to save!</p>
            <a 
              href="/home" 
              className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              Browse Projects
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedProj;
