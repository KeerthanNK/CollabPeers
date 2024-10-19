import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Signin from "./pages/login";
import Header from "./components/Header";
import myProjects from "./pages/myProjects";
import newProjects from "./pages/newProjects";
import savedProjects from "./pages/savedProjects";
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          
          {/* Protected routes, only accessible when logged in */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/header" element={<Header />} />
            <Route path="/my-projects" element={<myProjects />} />
            <Route path="/new-project" element={<newProjects />} />
            <Route path="/save" element={<savedProjects />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
