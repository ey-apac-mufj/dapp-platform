import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityCategory from "./pages/CommunityCategory";
import CommunityDetails from "./pages/CommunityDetails";
// import Home from "./Home";
import CommunityHome from "./pages/CommunityHome";
import Landing from "./pages/Landing";
import StudentList from "./pages/StudentList";
import "./styles/Home.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/old" element={<Home />} /> */}
          <Route path="/" element={<Landing />} />
          <Route path="/community-home" element={<CommunityHome />} />
          <Route
            path="/community-category/:category"
            element={<CommunityCategory />}
          />
          <Route path="/community-details" element={<CommunityDetails />} />
          <Route path="/student-list" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
