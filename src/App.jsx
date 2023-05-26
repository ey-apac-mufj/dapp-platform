import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityDetails from "./pages/CommunityDetails";
// import Home from "./Home";
import Landing from "./pages/Landing";
import "./styles/Home.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/old" element={<Home />} /> */}
          <Route path="/" element={<Landing />} />
          <Route path="/community-details" element={<CommunityDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
