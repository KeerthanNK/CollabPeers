import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Cards = (props) => {
  const saveProject = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/api/project/save/${props.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("Project saved successfully", response.data);
      alert("Saved successfully");

    } catch (err) {
      console.log("Error:", err);
    }
  };
  const navigate = useNavigate();
  const showDetails = () =>{
    navigate(`/details/${props.id}`);
  }
  return (
      <div className="mt-9 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg w-[950px] border border-gray-300 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-row justify-between p-6">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold text-gray-700">
                College: <span className="text-gray-900">{props.college_name}</span>
              </div>
              <div className="text-lg font-semibold text-gray-700">
                Project: <span className="text-gray-900">{props.Project_name}</span>
              </div>
              <div className="text-md text-gray-500">
                Year: <span className="text-gray-700">{props.year}</span>
              </div>
              <div className="text-md text-gray-500">
                Available Slots: <span className="text-gray-700">{props.availableSlots}</span>
              </div>
              <div className="text-md text-gray-500 flex items-center">
                Roles: <Skills roles={props.roles} />
              </div>
              <div className="text-md text-gray-500 flex items-center">
                Technologies: <Technologies technology={props.technology} />
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <button 
                onClick={saveProject} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
              >
                Save Project
              </button>
              <button 
                onClick={showDetails} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
              >
                Show details
              </button>
              <div className="text-sm text-gray-500 mt-4">
                Expires on: <span className="text-gray-700">{props.expire_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

const Skills = (props) => {
  const data = props.roles;
  return (
    <div className="ml-2 flex flex-row gap-2">
      {data.map((role, index) => (
        <span 
          key={index} 
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
        >
          {role}
        </span>
      ))}
    </div>
  );
};

const Technologies = (props) => {
  const data = props.technology;
  return (
    <div className="ml-2 flex flex-row gap-2">
      {data.map((tech, index) => (
        <span 
          key={index} 
          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default Cards;
