import React, { useState, useEffect } from "react";
import ProgressTable from "./ProgressTable";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import WorkoutCalendar from "./WorkoutCalendar";

export default function Profile({ userToken }) {
    const [stats, setStats] = useState([]);
    const [profilePic, setProfilePic] = useState();
    const [name, setName] = useState("");
    const [user, setUser] = useState();
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    const [workouts, setWorkouts] = useState([]);
    const [userReady, setUserReady] = useState(false);
    const [workoutsReady, setWorkoutsReady] = useState(false);
    const [calendar, setCalendar] = useState({
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: "",
    });

    async function fetchAllWorkouts() {
        try {
            const response = await axios.get("http://localhost:4000/workouts");
            return response.data.workouts_list;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAllWorkouts().then((result) => {
            if (result) {
                setWorkouts(result);
                setWorkoutsReady(true);
            }
        });
    }, []);

    async function fetchAllStats() {
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
        fetchAllStats().then((result) => {
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
                setCalendar(result.activeWorkouts[0]);
                setUserReady(true);
            }
        });
    }, [profilePic, name]);

    function toggleModalView() {
        setShowEditProfileModal((prev) => !prev);
    }
    if (userReady && workoutsReady) {
        return (
            user && (
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
                    <h2>{user?.name ? user.name : ""}</h2>

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
                            user={user}
                        />
                    </Link>
                </div>
            )
        );
    } else {
        return null;
    }
}
