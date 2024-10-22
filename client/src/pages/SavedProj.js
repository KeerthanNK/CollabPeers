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
      {error && <p>Error: {error}</p>}
      
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
        <p>No saved projects found.</p>
      )}
    </>
  );
};

export default SavedProj;
