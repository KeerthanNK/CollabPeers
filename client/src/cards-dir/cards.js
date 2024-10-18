import React from 'react'

const cards = (props) => {
  return (
    <div className='mt-9  flex flex-col justify-center items-center'>
           <div className='flex flex-row justify-around w-[950px] border-2 border-b-slate-600 '>
            <div className='flex flex-col justify-center gap-6 '>
                <div>College_name : "xyz"</div>
                <div>Project_name : {props.Project_name}</div>
                <div> AvailableSlots : {props.availableSlots}</div>
                <div className='flex justify-between gap-3'>
                    <div>Skill1</div>
                    <div>Skill2</div>
                    <div>Skill3</div>
                    <div>Skill4</div>
                </div>
            </div>
            <div className='flex flex-col justify-between'>
                <div>Save</div>
                <div>Days remaining</div>
            </div>
           </div>
    </div>
  )
}

export default cards