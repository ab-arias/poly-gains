import React, { useState, useEffect } from "react";
import WorkoutCards from "./WorkoutCards";
import axios from "axios";

export default function Workouts(props) {
    const [user, setUser] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [ready, setReady] = useState(false);
    const [calendar, setCalendar] = useState({
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: "",
    });

    async function fetchAll() {
        try {
            const response = await axios.get("http://localhost:4000/workouts");
            return response.data.workouts_list;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then((result) => {
            if (result) {
                setWorkouts(result);
            }
        });
    }, []);

    async function fetchUser() {
        try {
            const response = await axios.get(
                "http://localhost:4000/user/" + props.userToken.id
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
            }
            setReady(true);
        });
        // eslint-disable-next-line
    }, []);

    async function addActiveWorkout(workoutId) {
        if (workoutId) {
            user.workouts.push(workoutId);
        }
        try {
            const response = await axios.post(
                "http://localhost:4000/user/" + user._id,
                {
                    name: user.name,
                    avatar: user.avatar,
                    activeWorkouts: calendar,
                    workouts: user.workouts,
                }
            );
            setUser(response.data);
            setCalendar(response.data.activeWorkouts[0]);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function addWorkout(workout) {
        console.log(workout);
        const found = workouts.find((elem) => elem._id === workout._id);
        if (found) {
            console.log("change");
            try {
                const response = await axios.post(
                    "http://localhost:4000/workouts/" + workout._id,
                    workout
                );
                const result = response.data.workout;
                return result;
            } catch (error) {
                //We're not handling errors. Just logging into the console.
                console.log(error);
                return false;
            }
        } else {
            console.log("new");
            try {
                const response = await axios.post(
                    "http://localhost:4000/workouts",
                    workout
                );
                const result = response.data.workout;
                return result;
            } catch (error) {
                //We're not handling errors. Just logging into the console.
                console.log(error);
                return false;
            }
        }
    }

    if (ready) {
        return (
            <div className="workouts-main-container">
                <WorkoutCards
                    userToken={props.userToken}
                    user={user}
                    setUser={setUser}
                    workouts={workouts}
                    setWorkouts={setWorkouts}
                    calendar={calendar}
                    setCalendar={setCalendar}
                    addActiveWorkout={addActiveWorkout}
                    addWorkout={addWorkout}
                />
            </div>
        );
    } else {
        return null;
    }
}
