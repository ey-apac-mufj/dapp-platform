import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/LoginPage";
import Landing from "./pages/Landing";
import "./styles/Home.css";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
