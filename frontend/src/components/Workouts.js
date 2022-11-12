import React, { useState } from "react";
import WorkoutCalendar from "./WorkoutCalendar";
import WorkoutModal from "./WorkoutModal";

export default function Workouts() {
    const [showWorkout, setShowWorkout] = useState(false);
    const [openWorkout, setOpenWorkout] = useState(null);
    const [workoutCards, setWorkoutCards] = useState([]);

    function toggleShowWorkout() {
        setShowWorkout((prevStatus) => !prevStatus);
        if (openWorkout) setOpenWorkout(null);
    }

    function updateWorkout(workout) {
        console.log(workout);
        setWorkoutCards((prev) => [workout, ...prev]);
    }

    function handleOpenWorkout(workout) {
        setOpenWorkout(workout);
        setShowWorkout(true);
    }

    const cards = workoutCards.map((card) => (
        <div
            className="workouts-card"
            draggable
            onClick={() => handleOpenWorkout(card)}
            onDragStart={(e) => {
                let val = JSON.stringify(card);
                e.dataTransfer.setData("card", val);
            }}
        >
            <div className="workouts-card-header">{card.title}</div>
            <div className="workouts-card-body">
                {card.exercises.map((exercise) => (
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

    return (
        <div className="workouts-main-container">
            {showWorkout && (
                <WorkoutModal
                    toggle={toggleShowWorkout}
                    updateWorkout={updateWorkout}
                    workout={openWorkout}
                />
            )}
            <WorkoutCalendar
                handleOpenWorkout={handleOpenWorkout}
                preview={false}
            />
            <div className="workouts-cards-container">
                {cards}
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
