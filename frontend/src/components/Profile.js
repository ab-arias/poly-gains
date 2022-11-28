import React, { useState, useEffect } from "react";
import ProgressTable from "./ProgressTable";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import WorkoutCalendar from "./WorkoutCalendar";

export default function Profile({ userToken }) {
    const [stats, setStats] = useState();
    const [user, setUser] = useState();
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [workouts, setWorkouts] = useState();
    const [calendar, setCalendar] = useState();

    async function fetchUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "user/" + userToken.id
            );
            return response.data.user;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchUser().then((result) => {
            if (result) {
                setUser(result);
                setCalendar(result.activeWorkouts);
                fetchStats(result.stats).then((result1) => {
                    if (result1) {
                        setStats(result1);
                    }
                });
            }
        });
        // eslint-disable-next-line
    }, []);

    async function fetchWorkouts() {
        try {
            const response = await axios.get(window.$BACKEND_URI + "workouts", {
                params: { workouts: user.workouts },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        if (user) {
            fetchWorkouts().then((result) => {
                if (result) {
                    setWorkouts(result);
                }
            });
        }
        // eslint-disable-next-line
    }, [user]);

    async function fetchStats(Id) {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "stats/" + Id
            );
            return response.data.stats_list;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function toggleModalView() {
        setShowEditProfileModal((prev) => !prev);
    }

    return (
        user &&
        workouts &&
        stats && (
            <div className="profile-main-container">
                {showEditProfileModal && (
                    <EditProfileModal
                        closeModal={toggleModalView}
                        user={user}
                        setUser={setUser}
                    />
                )}
                <img
                    className="profile-avatar"
                    src={
                        user?.avatar
                            ? user.avatar
                            : require("../assets/img/DefaultProfilePic.jpeg")
                    }
                    alt="Cannot display"
                />
                <h2>{user.name}</h2>
                <h4>@{user.username}</h4>

                <div className="center-dashboard">
                    <Link className="link-container" to="/stats">
                        <ProgressTable statsData={stats} />
                    </Link>

                    <div className="dashboard-buttons-container">
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleModalView()}
                        >
                            <div className="update-profile-button">
                                <img
                                    className="profile-button-avatar"
                                    src={
                                        user?.avatar
                                            ? user.avatar
                                            : require("../assets/img/DefaultProfilePic.jpeg")
                                    }
                                    alt="Cannot display"
                                />
                                <h3>Edit Profile</h3>
                            </div>
                        </div>
                        <Link className="link-container" to="/calpoly">
                            <div className="calpoly-button">
                                <img
                                    className="calpoly-logo"
                                    src={require("../assets/img/CalPolyLogo.png")}
                                    alt="Cannot display"
                                />
                                <h3>Cal Poly Resources</h3>
                            </div>
                        </Link>
                    </div>
                </div>

                <Link className="link-container" to="/workouts">
                    <WorkoutCalendar
                        preview={true}
                        workouts={workouts}
                        calendar={calendar}
                    />
                </Link>
                <div className="space"></div>
                <div className="shape"></div>
                <h3 className="section-header">Resources:</h3>
                <div className="resources">
                    <div className="left-res">
                        <div className="Res-Link">
                            Learn More About Training:
                            <a
                                className="RecLink"
                                href="https://www.trifectanutrition.com/blog/hypertrophy-training-for-muscle-growth-and-how-to-do-it-right"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="article-icon"
                                    src={require("../assets/img/Article-Icon.png")}
                                    alt="cannot display"
                                ></img>
                            </a>
                        </div>
                        <div className="Res-Link">
                            Learn More About Diet:
                            <a
                                className="RecLink"
                                href="https://www.healthline.com/nutrition/bodybuilding-meal-plan#:~:text=Foods%20to%20Focus%20On&text=Meats%2C%20poultry%2C%20and%20fish%3A,quinoa%2C%20popcorn%2C%20and%20rice."
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="article-icon"
                                    src={require("../assets/img/Article-Icon.png")}
                                    alt="cannot display"
                                ></img>
                            </a>
                        </div>
                    </div>
                    <div className="right-res">
                        <div className="contact-head">
                            Contact Us:
                            <a href="mailto:polygains@gmail.com">
                                <img
                                    className="article-icon"
                                    src={require("../assets/img/mail-icon.png")}
                                    alt="cannot display"
                                ></img>
                            </a>
                        </div>
                        <div class="LI-Link">
                            Grant Jonhson
                            <a 
                                classname="RecLink"
                                href="#/"
                                target="_blank"
                                rel="noreferrer">
                                <img 
                                    className="article-icon"
                                    src={require("../assets/img/linkedin-logo.png")}
                                    alt="cannot display">
                                </img>
                            </a>
                        </div>
                        <div class="LI-Link">
                            Nicholas Micali
                            <a 
                                classname="RecLink"
                                href="https://www.linkedin.com/in/nicholas-micali-a83b29181"
                                target="_blank"
                                rel="noreferrer">
                                <img 
                                    className="article-icon"
                                    src={require("../assets/img/linkedin-logo.png")}
                                    alt="cannot display">
                                </img>
                            </a>
                        </div>
                        <div class="LI-Link">
                            Marco Araiza
                            <a 
                                classname="RecLink"
                                href="#/"
                                target="_blank"
                                rel="noreferrer">
                                <img 
                                    className="article-icon"
                                    src={require("../assets/img/linkedin-logo.png")}
                                    alt="cannot display">
                                </img>
                            </a>
                        </div>
                        <div class="LI-Link">
                            Abraham Arais
                            <a 
                                classname="RecLink"
                                href="#/"
                                target="_blank"
                                rel="noreferrer">
                                <img 
                                    className="article-icon"
                                    src={require("../assets/img/linkedin-logo.png")}
                                    alt="cannot display">
                                </img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
