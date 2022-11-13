import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressTable from "./ProgressTable";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OtherProfile() {
    const params = useParams();
    const [stats, setStats] = useState([]);
    const [user, setUser] = useState();
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
    };

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
                "http://localhost:4000/profile/" + params.username
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
    }, [params.username]);

    const content = Object.entries(calendar).map(([day, plan]) => (
        <div
            className="workouts-calendar-entry"
            style={day === "Sunday" ? { borderRightWidth: "0" } : null}
        >
            <h3 className="workouts-calendar-day">{day}</h3>
            <div className="mini-workouts-card">
                <div className="workouts-card-header">{plan.title}</div>
                <div className="workouts-card-body">
                    {plan.exercises.map((exercise) => (
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                {exercise.exercise}
                            </div>
                            <div className="workouts-card-sets-reps">
                                {exercise.sets}
                                <span> sets x </span>
                                {exercise.reps}
                                <span> reps</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ));

    return (
        user && (
            <div className="profile-main-container">
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
                </div>

                <Link className="link-container" to="/workouts">
                    <div className="workouts-calendar-container">
                        <h2 className="section-header">My Workouts</h2>
                        <div className="workouts-calendar">{content}</div>
                    </div>
                </Link>
            </div>
        )
    );
}
