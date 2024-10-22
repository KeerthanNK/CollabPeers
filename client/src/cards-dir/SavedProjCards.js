import React from 'react';
import axios from 'axios';

const SavedProjCards = (props) => {
  const unsaveProject = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token not found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/project/unsave/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Project unsaved successfully", response.data);
      alert("Unsaved successfully");
      
      // Reload the page after the alert
      window.location.reload();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className='mt-9 flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-around w-[950px] border-2 border-b-slate-600'>
        <div className='flex flex-col justify-center gap-6'>
          <div>College Name: {props.college}</div>
          <div>Project Name: {props.project}</div>
          <div>YEAR: {props.year}</div>
          <div>Available Slots: {props.slots}</div>
          <div className='flex'>
            <div>Roles: </div>
            <div className='flex ml-2'><Skills roles={props.roles} /></div>
          </div>
          <div className='flex'>
            <div>Technologies:</div>
            <div className='flex ml-2'><Technologies technology={props.technology} /></div>
          </div>
        </div>
        <div className='flex flex-row justify-between gap-3'>
          <div><button onClick={unsaveProject}>Unsave</button></div>
        </div>
      </div>
    </div>
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

export default SavedProjCards;
