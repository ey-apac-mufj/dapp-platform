import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityCategory from "./pages/CommunityCategory";
import CommunityDetails from "./pages/CommunityDetails";
import Login from "./pages/LoginPage";
import ContractDeposit from "./pages/ContractDeposit";
import Landing from "./pages/Landing";
import OfferList from "./pages/OfferList";
import OfferDetail from "./pages/OfferDetail";

import StudentList from "./pages/StudentList";
import TalentDetail from "./pages/TalentDetail";
import "./styles/Home.css";
import Profile from "./pages/Profile";
import DummyEDIHome from "./pages/DummyEDIHome";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/old" element={<Home />} /> */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edi-home" element={<DummyEDIHome />} />
          <Route
            path="/community-category/:category"
            element={<CommunityCategory />}
          />
          <Route path="/community-details" element={<CommunityDetails />} />
          <Route path="/talent-list" element={<StudentList />} />
          <Route path="/talents/:talentAddress" element={<TalentDetail />} />
          <Route
            path="/deposit-contract/:splitAddress"
            element={<ContractDeposit />}
          />
          <Route path="/offers" element={<OfferList />} />
          <Route path="/offers/:offerId" element={<OfferDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
