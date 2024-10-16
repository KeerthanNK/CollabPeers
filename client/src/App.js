import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Signup from "./components/signup"
import Signin from "./components/login";
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/signin" element = {<Signin/>}/>
        </Routes>
      </div>
    </Router>
  );
}
