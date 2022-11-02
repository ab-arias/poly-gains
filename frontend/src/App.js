import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Stats from "./components/Stats";
import CalPoly from "./components/CalPoly";
import Workouts from "./components/Workouts";
import EditProfile from "./components/EditProfile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div class="header">
          <div class="left-header">
            <Link to="/">
              <img
                style={{ height: 60 }}
                src={require("./assets/img/PolyGainsLogo.png")}
                alt="PolyGains"
              />
            </Link>
          </div>
          <div class="middle-header">
            <Link className="Hlink" to="/calpoly">
              CalPoly
            </Link>
            <Link className="Hlink" to="/stats">
              Stats
            </Link>
            <Link className="Hlink" to="/workouts">
              Workouts
            </Link>
          </div>
          <div class="right-header">
            <p>Profile</p>
          </div>
        </div>

        <div className="main-body">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/calpoly" element={<CalPoly />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
