// Home Component
import React, { useState, useEffect } from 'react';
import Cards from '../cards-dir/cards';
import axios from 'axios';
import CollegeSearchBar from '../components/collegeSearchbar';
const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getAllProjects');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const data = users.getAll || [];

  return (
    <>
      
      <div className="pt-6 sticky top-[80px] z-45 bg-white flex justify-center gap-48 items-center py-4 shadow-md">
        <div>
          <YearDashBoard />
        </div>
        <div>
          <CollegeSearchBar />
        </div>
      </div>

      <div className="mt-10 z-0">
        {data.map((element, index) => (
          <Cards key={index} Project_name={element.projectname} availableSlots={element.availableSlots} />
        ))}
      </div>
    </>
  );
};

const YearDashBoard = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  // Close dashboard when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isDashboardOpen && !e.target.closest('.dashboard')) {
        setIsDashboardOpen(false);
      }
    };

    if (isDashboardOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDashboardOpen]);

  return (
    <div
      className="relative hover:cursor-pointer"
      onClick={(e) => {
        e.stopPropagation(); // Prevents closing the dashboard when clicking on 'click'
        toggleDashboard();
      }}
    >
      Select Year

      {isDashboardOpen && (
        <div
          className="dashboard absolute top-full mt-2 w-40 bg-slate-600 p-4 shadow-lg mr-96"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the dashboard from closing it
        >
          <div className="flex justify-center gap-10 w-auto">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
