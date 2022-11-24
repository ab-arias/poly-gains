import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressTable from "./ProgressTable";
import WorkoutCalendar from "./WorkoutCalendar";
import axios from "axios";

export default function OtherProfile({ userToken }) {
    const params = useParams();
    const [stats, setStats] = useState();
    const [user, setUser] = useState();
    const [calendar, setCalendar] = useState();
    const [workouts, setWorkouts] = useState();

    async function fetchUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "profile/" + params.username
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
    }, [params.username]);

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

    return (
        user &&
        workouts &&
        stats && (
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
                <h2>{user.name}</h2>

                <div className="center-dashboard">
                    <ProgressTable statsData={stats} otherName={user.name} />
                </div>
                <WorkoutCalendar
                    preview={true}
                    workouts={workouts}
                    calendar={calendar}
                    otherName={user.name}
                />
            </div>
        )
    );
}
