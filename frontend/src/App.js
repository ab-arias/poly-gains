import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Stats from "./components/Stats";
import CalPoly from "./components/CalPoly";
import Workouts from "./components/Workouts";
import Auth from "./components/Auth/Auth";
import OtherProfile from "./components/OtherProfile";
import Header from "./components/Header";

export default function App() {
    const [userToken, setUserToken] = useState();
    const [showFriendsModal, setShowFriendsModal] = useState(false);

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
                    <Header
                        userToken={userToken}
                        handleLogOut={handleLogOut}
                        setShowFriendsModal={setShowFriendsModal}
                    />
                    <div className="main-body">
                        {showFriendsModal && <div></div>}
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
                                element={<OtherProfile userToken={userToken} />}
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
