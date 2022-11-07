<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> main
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Stats from "./components/Stats";
import CalPoly from "./components/CalPoly";
import Workouts from "./components/Workouts";
import EditProfile from "./components/EditProfile";
<<<<<<< HEAD

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
=======
import Auth from "./components/Auth";

export default function App() {
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUserToken(foundUser);
        }
    }, []);

    function handleUserLogIn(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUserToken(user);
    }

    function handleLogOut() {
        setUserToken();
        localStorage.clear();
    }

    return (
        <BrowserRouter>
            {userToken ? (
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
                            <div onClick={handleLogOut}>Log Out</div>
                        </div>
                    </div>

                    <div className="main-body">
                        <Routes>
                            <Route
                                path="/"
                                element={<Profile userToken={userToken} />}
                            />
                            <Route
                                path="/stats"
                                element={<Stats userToken={userToken} />}
                            />
                            <Route
                                path="/calpoly"
                                element={<CalPoly userToken={userToken} />}
                            />
                            <Route
                                path="/workouts"
                                element={<Workouts userToken={userToken} />}
                            />
                            <Route
                                path="/editprofile"
                                element={<EditProfile userToken={userToken} />}
                            />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Auth handleUserLogIn={handleUserLogIn} />
            )}
        </BrowserRouter>
    );
>>>>>>> main
}
