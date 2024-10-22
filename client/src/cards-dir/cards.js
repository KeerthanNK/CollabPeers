import React from 'react';
import axios from 'axios';

const Cards = (props) => {
  const saveProject = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }
      
      // Fixing Axios request
      const response = await axios.post(
        `http://localhost:8000/api/project/save/${props.id}`, // Fixed template literal syntax
        {}, // You can send request body here if needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed Authorization header
          }
        }
      );
      
      console.log("Project saved successfully", response.data);
      alert("Saved successfully");
      
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
    <a href={`/details/${props.id}`}>
    <div className='mt-9 flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-around w-[950px] border-2 border-b-slate-600'>
        <div className='flex flex-col justify-center gap-6'>
          <div>College_name: {props.college_name}</div>
          <div>Project_name: {props.Project_name}</div>
          <div>YEAR: {props.year}</div>
          <div>Available Slots: {props.availableSlots}</div>
          <div className='flex'>
            <div>Roles: </div>
            <div className='flex ml-2'><Skills roles={props.roles} /></div>
          </div>
          <div className='flex'>
            <div>Technologies: </div>
            <div className='flex ml-2'><Technologies technology={props.technology} /></div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div><button onClick={saveProject}>Save</button></div>
          <div>Expires on: {props.expire_date}</div>
        </div>
      </div>
    </div>
    </a>
    </>
  );
};

const Skills = (props) => {
  const data = props.roles;
  return (
    <div className='flex flex-row gap-4'>
      {data.map((element, index) => (
        <div key={index}>
          {element}
        </div>
      ))}
    </div>
  );
};

const Technologies = (props) => {
  const data = props.technology;
  return (
    <div className='flex flex-row gap-4'>
      {data.map((element, index) => (
        <div key={index}>
          {element}
        </div>
      ))}
    </div>
  );
};

export default Cards;
