import React from 'react';

const Cards = (props) => {
  return (
    <div className='mt-9 flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-around w-[950px] border-2 border-b-slate-600'>
        <div className='flex flex-col justify-center gap-6'>
          <div>College_name : {props.college_name}</div>
          <div>Project_name : {props.Project_name}</div>
          <div>YEAR : {props.year}</div>
          <div>AvailableSlots : {props.availableSlots}</div>
          <div className='flex'>
            <div>Roles : </div>
            <div className='flex ml-2'><Skills roles={props.roles} /></div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div>Save</div>
          <div>Expires on : {props.expire_date}</div>
        </div>
      </div>
    </div>
  );
};

const Skills = (props) => {
  const data = props.roles;
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

export default Cards;
