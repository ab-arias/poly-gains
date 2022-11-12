import React, { useState, useEffect } from "react";
import ProgressTable from "./ProgressTable";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

export default function Profile({ userToken }) {
    const [stats, setStats] = useState([]);
    const [profilePic, setProfilePic] = useState();
    const [name, setName] = useState("");
    const [user, setUser] = useState();
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const restCard = {
        title: "Rest",
        exercises: [],
    };
    const calendar = {
        Monday: restCard,
        Tuesday: restCard,
        Wednesday: restCard,
        Thursday: restCard,
        Friday: restCard,
        Saturday: restCard,
        Sunday: restCard,
    }

    async function fetchAll() {
        try {
            const response = await axios.get("http://localhost:4000/stats");
            return response.data.stats_list;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then((result) => {
            if (result) setStats(result);
        });
    }, []);

    async function fetchUser() {
        try {
            const response = await axios.get(
                "http://localhost:4000/user/" + userToken.id
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
            }
        });
    }, [profilePic, name]);

    function toggleModalView() {
        setShowEditProfileModal((prev) => !prev);
    }

    const content = Object.entries(calendar).map(([day, plan]) => (
        <div
            className="workouts-calendar-entry"
            style={
                day === "Sunday"
                    ? { borderRightWidth: "0" }
                    : null
            }
        >
            <h3 className="workouts-calendar-day">{day}</h3>
            <div className="mini-workouts-card">{plan.title}</div>
        </div>
    ));


    return (
        <div className="profile-main-container">
            {showEditProfileModal && (
                <EditProfileModal
                    closeModal={toggleModalView}
                    updateProfilePic={setProfilePic}
                    currentPic={
                        user?.avatar
                            ? user.avatar
                            : require("../assets/img/DefaultProfilePic.jpeg")
                    }
                    updateName={setName}
                    currentName={user.name}
                    user={user}
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
            <h2>{user?.name ? user.name : "User's Name"}</h2>

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
                <div className="workouts-calendar-container">
                    <h2 className="section-header">My Workouts</h2>
                    <div className="workouts-calendar">{content}</div>
                </div>
            </Link>
        </div>
    );
}
