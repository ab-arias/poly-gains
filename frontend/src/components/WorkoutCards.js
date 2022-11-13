import React, { useState } from "react";
//import { v4 as uuid } from "uuid";
import WorkoutModal from "./WorkoutModal";

export default function WorkoutCards({
    userToken,
    user,
    setUser,
    workouts,
    setWorkouts,
    calendar,
    setCalendar,
    addActiveWorkout,
    addWorkout,
}) {
    const [showWorkout, setShowWorkout] = useState(false);
    const [openWorkout, setOpenWorkout] = useState(null);
    const [cards, setCards] = useState([]);

    function toggleShowWorkout() {
        console.log(cards);
        setShowWorkout((prevStatus) => !prevStatus);
        if (openWorkout) setOpenWorkout(null);
        console.log(cards);
        return;
    }

    function getUserWorkouts() {
        for (const x of user.workouts) {
            const workout = workouts.find((elem) => elem._id === x);
            if (workout) {
                const found = cards.find((elem) => elem._id === workout._id);
                if (!found && workout) {
                    cards.push(workout);
                } else if (found && workout) {
                    const idx = cards.indexOf(found);
                    cards[idx] = workout;
                }
            }
        }
        return;
    }

    function addToDay(e, day) {
        let plan = JSON.parse(e.dataTransfer.getData("card"));
        calendar[day] = plan._id;
        addActiveWorkout();
        return;
    }

    async function updateWorkout(workout) {
        console.log(workout);
        const backendWorkout = await addWorkout(workout);
        const found = cards.find((elem) => elem._id === backendWorkout._id);
        console.log(backendWorkout);
        console.log(workout);
        if (!found) {
            workouts.push(backendWorkout);
            setCards((prev) => [backendWorkout, ...prev]);
            addActiveWorkout(backendWorkout._id);
            setShowWorkout((prevStatus) => !prevStatus);
            setOpenWorkout(backendWorkout);
            setShowWorkout((prevStatus) => !prevStatus);
            return;
        } else {
            const idx = workouts.indexOf(found);
            workouts[idx] = backendWorkout;
            setShowWorkout((prevStatus) => !prevStatus);
            setOpenWorkout(backendWorkout);
            setShowWorkout((prevStatus) => !prevStatus);
            return;
        }
    }

    function handleOpenWorkout(workout) {
        setOpenWorkout(workout);
        setShowWorkout(true);
        return;
    }

    getUserWorkouts();

    const displayCards = cards.map((card) => (
        <div
            className="workouts-card"
            draggable
            onClick={() => handleOpenWorkout(card)}
            onDragStart={(e) => {
                let val = JSON.stringify(card);
                e.dataTransfer.setData("card", val);
            }}
        >
            <div className="workouts-card-header">{card.name}</div>
            <div className="workouts-card-body">
                {card.exercise_list.map((exercise) => (
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
    ));

    function getActiveWorkout(id) {
        const plan = cards.find((elem) => elem._id === id);
        if (plan) {
            return plan.name;
        }
        return;
    }

    const content = Object.entries(calendar).map(([day, planId]) => (
        <div
            className="workouts-calendar-entry"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => addToDay(e, day)}
        >
            <h3 className="workouts-calendar-day">{day}</h3>
            <div className="mini-workouts-card">{getActiveWorkout(planId)}</div>
        </div>
    ));

    return (
        <div>
            {showWorkout && (
                <WorkoutModal
                    toggle={toggleShowWorkout}
                    updateWorkout={updateWorkout}
                    workout={openWorkout}
                    setWorkout={setOpenWorkout}
                />
            )}
            <div className="workouts-calendar-container">
                <h2 className="section-header">My Workouts</h2>
                <div className="workouts-calendar">{content}</div>
            </div>
            <div className="workouts-cards-container">
                {displayCards}
                <div
                    className="workouts-card"
                    onClick={() => toggleShowWorkout()}
                >
                    Create New Workout
                </div>
            </div>
        </div>
    );
}
