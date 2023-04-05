import React, { useState, useEffect } from "react";
import WorkoutCards from "./WorkoutCards";
import axios from "axios";

export default function Workouts({ userToken }) {
    const [user, setUser] = useState();
    const [workouts, setWorkouts] = useState();
    const [calendar, setCalendar] = useState();

    async function fetchUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "user/" + userToken.id
            );
            return response.data.user;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        fetchUser().then((result) => {
            if (result) {
                setUser(result);
                setCalendar(result.activeWorkouts);
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
            return false;
        }
    }

    async function addNewWorkout(newWorkout) {
        try {
            const newWorkouts = [...user.workouts, newWorkout];
            const response = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                {
                    name: user.name,
                    avatar: user.avatar,
                    activeWorkouts: user.activeWorkouts,
                    workouts: newWorkouts,
                }
            );
            setUser(response.data);
        } catch (error) {
            return false;
        }
    }

    async function removeOldWorkout(oldWorkout) {
        try {
            const restId = "637012e5c8e5bba98b4d3903";
            const newWorkouts = user.workouts.filter(
                (workout) => workout !== oldWorkout
            );
            const newActiveWorkouts = Object.fromEntries(
                Object.entries(user.activeWorkouts).map(([day, id]) =>
                    id === oldWorkout ? [day, restId] : [day, id]
                )
            );
            const response = await axios.post(
                window.$BACKEND_URI + "user/" + user._id,
                {
                    name: user.name,
                    avatar: user.avatar,
                    activeWorkouts: newActiveWorkouts,
                    workouts: newWorkouts,
                }
            );
            setUser(response.data);
            setCalendar(response.data.activeWorkouts);
        } catch (error) {
            return false;
        }
    }

    async function updateExistingWorkout(workout) {
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "workouts/" + workout._id,
                workout
            );
            const result = response.data.workout;
            const newWorkouts = workouts.map((workout) =>
                workout._id === result._id ? result : workout
            );
            setWorkouts(newWorkouts);
            return result;
        } catch (error) {
            return false;
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
            return false;
        }
    }

    function handleActiveDrop(e) {
        let fromDay = JSON.parse(e.dataTransfer.getData("card"));
        if (fromDay.day) {
            removeActiveWorkout(fromDay.day);
        }
    }

    return (
        workouts &&
        calendar && (
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleActiveDrop}
            >
                <WorkoutCards
                    workouts={workouts}
                    calendar={calendar}
                    addActiveWorkout={addActiveWorkout}
                    updateExistingWorkout={updateExistingWorkout}
                    removeOldWorkout={removeOldWorkout}
                    addNewWorkout={addNewWorkout}
                />
            </div>
        )
    );
}
