import React, { useState, useEffect } from "react";
import Cards from "../cards-dir/cards";
import axios from "axios";
import CollegeSearchBar from "../components/collegeSearchbar";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchedCollege, setSearchedCollege] = useState("");
  const [year, setYear] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllProjects"
        );
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

  const filteredData = data.filter((element) => {
    const matchesCollege =
      searchedCollege === "" ||
      searchedCollege === "All" ||
      element.collegename === searchedCollege;

    const matchesYear = year === "All" || String(element.year) === String(year);

    return matchesCollege && matchesYear;
  });

  const selectAllCol = (college) => {
    setSearchedCollege(college);
  };

  return (
    <>
      <div className="sticky top-[60px] z-48 bg-white flex justify-center gap-48 items-center py-4 shadow-md">
        <div>
          <YearDashBoard setYear={setYear} />
        </div>
        <div>
          <CollegeSearchBar
            searchedCollege={searchedCollege}
            setSearchedCollege={setSearchedCollege}
          />
        </div>
        <div
          className="hover:cursor-pointer hover:text-[#6366F1] text-sm font-medium text-gray-700"
          onClick={() => selectAllCol("All")}
        >
          Select All Colleges
        </div>
      </div>

      <div className="ml-10 mt-10 z-0">
        <h3 className="sticky top-[180px] z-50 text-[#6366F1] text-lg font-semibold">
          Selected College: {searchedCollege || "All Colleges"}
        </h3>
        <h4 className="sticky top-[200px] z-50 text-[#6366F1] text-base font-medium">
          Selected Year: {year || "All Years"}
        </h4>
        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {error && <p className="text-red-500 text-sm">Error: {error}</p>}
        {!loading && !error && filteredData.length > 0 ? (
          filteredData.map((element, index) => (
            <Cards
              key={index}
              Project_name={element.projectname}
              college_name={element.collegename}
              availableSlots={element.availableSlots}
              expire_date={element.deadline}
              year={element.year}
              roles={element.roles}
              technology={element.technology}
              id={element._id}
            />
          ))
        ) : (
          <p className="text-[#6366F1] text-sm">No projects found</p>
        )}
      </div>
    </>
  );
};

const YearDashBoard = ({ setYear }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const storeYear = (selectedYear) => {
    setYear(selectedYear);
    setIsDashboardOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isDashboardOpen && !e.target.closest(".dashboard")) {
        setIsDashboardOpen(false);
      }
    };

    if (isDashboardOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDashboardOpen]);

  return (
    <div
      className="relative hover:cursor-pointer hover:text-[#6366F1] hover:underline text-sm font-medium text-gray-700"
      onClick={(e) => {
        e.stopPropagation();
        toggleDashboard();
      }}
    >
      Select Year
      {isDashboardOpen && (
        <div
          className="dashboard absolute top-full mt-2 w-40 p-4 shadow-lg bg-white rounded-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row justify-between gap-4">
            <div
              className="hover:text-[#6366F1] text-sm cursor-pointer"
              onClick={() => storeYear("1")}
            >
              1
            </div>
            <div
              className="hover:text-[#6366F1] text-sm cursor-pointer"
              onClick={() => storeYear("2")}
            >
              2
            </div>
            <div
              className="hover:text-[#6366F1] text-sm cursor-pointer"
              onClick={() => storeYear("3")}
            >
              3
            </div>
            <div
              className="hover:text-[#6366F1] text-sm cursor-pointer"
              onClick={() => storeYear("4")}
            >
              4
            </div>
            <div
              className="hover:text-[#6366F1] text-sm cursor-pointer"
              onClick={() => storeYear("All")}
            >
              All
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
