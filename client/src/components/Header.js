// Header Component
import React, { useState, useEffect } from 'react';

const Header = () => {
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
    <nav className="sticky top-0 z-40 flex justify-evenly border-solid border-2 border-gray-100 h-20 items-center bg-slate-200">
      <div className="hover:cursor-pointer hover:underline">
        <a href="/">logo</a>
      </div>
      <div className="flex justify-evenly gap-3">
        <div className="hover:cursor-pointer hover:underline">
          <a href="/">Projects</a>
        </div>
        <div className="hover:cursor-pointer hover:underline">
          <a href="/my-projects">MyProjects</a>
        </div>
        <div className="hover:cursor-pointer hover:underline">
              <a href="/new-project"> NewProjects </a>
        </div>
        <div className="hover:cursor-pointer hover:underline">
          <a href="/save">SavedProjects</a>
        </div>
      </div>
      <div
        className="relative hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // Prevents closing the dashboard when clicking on 'click'
          toggleDashboard();
        }}
      >
        click

        {isDashboardOpen && (
          <div
            className="dashboard absolute top-full mt-2 w-40 bg-slate-600 p-4 shadow-lg z-50"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="hover:cursor-pointer hover:underline">Logout</div>
            <div className="hover:cursor-pointer hover:underline">Delete Account</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
