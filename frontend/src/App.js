import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Stats from "./components/Stats";
import CalPoly from "./components/CalPoly";
import Workouts from "./components/Workouts";
import Auth from "./components/Auth";
import OtherProfile from "./components/OtherProfile";
import SearchBar from "./components/SearchBar";

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
                    <div className="header">
                        <div className="left-header">
                            <div className="left-header-button">
                                <Link to="/">
                                    <img
                                        style={{ height: 50 }}
                                        src={require("./assets/img/PolyGainsLogo.png")}
                                        alt="PolyGains"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="middle-header">
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
                        <div className="right-header">
                            <SearchBar userToken={userToken} />
                            <div
                                className="log-out Hlink"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </div>
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
                                path={"/profile/:username"}
                                element={<OtherProfile />}
                            />
                        </Routes>
                    </div>
                </div>
            ) : (
                <Auth handleUserLogIn={handleUserLogIn} />
            )}
        </BrowserRouter>
    );
}
