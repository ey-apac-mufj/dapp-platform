import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityCategory from "./pages/CommunityCategory";
import CommunityDetails from "./pages/CommunityDetails";
import CommunityHome from "./pages/CommunityHome";
import ContractDeposit from "./pages/ContractDeposit";
import Landing from "./pages/Landing";
import NurseOffers from "./pages/NurseOffers";
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
          <Route
            path="/deposit-contract/:splitAddress"
            element={<ContractDeposit />}
          />
          <Route path="/nurse-offers" element={<NurseOffers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
