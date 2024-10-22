import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MyprojectCards = (props) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the Editproj component with project details passed as state
    navigate('/edit-project', {
      state: {
        project_id: props.id,
        project_name: props.project_name,
        description: props.description,
        availableSlots: props.slots,
        roles: props.roles,
        technology: props.technology,
        deadline: props.deadline
      }
    });
  };
  const deleteProject = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      // Include the project ID when sending the data
      const response = await axios.delete(
        `http://localhost:8000/api/project/delete/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Project deleted successfully:", response.data);
      alert("Project deleted successfully");
    } catch (error) {
      console.error("There was an error deleting the project:", error);
    }

  }
  return (
    <div className='mt-9 flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-around w-[950px] border-2 border-b-slate-600'>
        <div className='flex flex-col justify-center gap-6'>
          <div>College_name : {props.college_name}</div>
          <div>Project_name : {props.project_name}</div>
          <div>YEAR : {props.year}</div>
          <div>AvailableSlots : {props.slots}</div>
          <div className='flex'>
            <div>Roles : </div>
            <div className='flex ml-2'><Skills roles={props.roles} /></div>
          </div>
          <div className='flex'>
            <div>Technologies:</div>
            <div className='flex ml-2'><Technologies technology={props.technology} /></div>
          </div>
        </div>
        <div className='flex flex-row justify-between gap-3'>
          <div><button onClick={handleEdit}>Edit</button></div>
          <div onClick={deleteProject} className='hover:cursor-pointer'>Delete</div>
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
      {
        data.map((element, index) => (
          <div key={index}>
            {element}
          </div>
        ))
      }
    </div>
  );
};

export default MyprojectCards;
