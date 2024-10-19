import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/login";
import Header from "./components/Header";
import myProjects from "./pages/myProjects";

import savedProjects from "./pages/savedProjects";
import ProjectForm from "./pages/newProjects";
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/header" element={<Header />} />
          <Route path="/my-projects" element={<myProjects />} />
          <Route path="/new-project" element={<ProjectForm />} />
          <Route path="/save" element={<savedProjects />} />
        </Routes>
      </div>
    </Router>
  );
}
