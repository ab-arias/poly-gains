import React, { useState, useEffect } from "react";
import WorkoutCards from "./WorkoutCards";
import axios from "axios";

export default function Workouts(props) {
    const [user, setUser] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [ready, setReady] = useState(false);
    const [calendar, setCalendar] = useState();

    async function fetchAll() {
        try {
            const response = await axios.get(window.$BACKEND_URI + "workouts");
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
                window.$BACKEND_URI + "user/" + props.userToken.id
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
            }
            setReady(true);
        });
        // eslint-disable-next-line
    }, []);

    async function addActiveWorkout(newActiveWorkouts) {
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                {
                    name: user.name,
                    avatar: user.avatar,
                    activeWorkouts: newActiveWorkouts,
                    workouts: user.workouts,
                }
            );
            setUser(response.data);
            setCalendar(response.data.activeWorkouts);
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
                    window.$BACKEND_URI + "workouts/" + workout._id,
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
                    window.$BACKEND_URI + "workouts",
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

    async function removeActiveWorkout(day) {
        const restId = "637012e5c8e5bba98b4d3903";
        const newActWorkouts = { ...user.activeWorkouts, [day]: restId };
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                {
                    name: user.name,
                    avatar: user.avatar,
                    activeWorkouts: newActWorkouts,
                    workouts: user.workouts,
                }
            );
            setUser(response.data);
            setCalendar(response.data.activeWorkouts);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    function handleActiveDrop(e) {
        let fromDay = e.dataTransfer.getData("activeCard");
        if (fromDay) {
            let day = JSON.parse(fromDay);
            removeActiveWorkout(day);
        }
    }

    if (ready) {
        return (
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleActiveDrop}
            >
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
                    removeActiveWorkout={removeActiveWorkout}
                />
            </div>
        );
    } else {
        return null;
    }
}
