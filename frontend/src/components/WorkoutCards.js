import React, { useState } from "react";
import WorkoutCalendar from "./WorkoutCalendar";
import WorkoutModal from "./WorkoutModal";
import {
    AiOutlineCloseCircle,
    AiOutlinePlusCircle,
    AiOutlineEdit,
} from "react-icons/ai";
import axios from "axios";

export default function WorkoutCards({
    workouts,
    calendar,
    addActiveWorkout,
    updateExistingWorkout,
    removeOldWorkout,
    addNewWorkout,
}) {
    const [showWorkout, setShowWorkout] = useState(false);
    const [openWorkout, setOpenWorkout] = useState(null);
    const [editingWorkouts, setEditingWorkouts] = useState(false);

    function toggleShowWorkout() {
        setShowWorkout((prevStatus) => !prevStatus);
        if (openWorkout) setOpenWorkout(null);
        return;
    }

    function addToDay(e, day) {
        e.stopPropagation();
        let data = JSON.parse(e.dataTransfer.getData("card"));
        const newActives = { ...calendar, [day]: data.id };
        addActiveWorkout(newActives);
        return;
    }

    async function createNewWorkout(workout) {
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "workouts",
                workout
            );
            const result = response.data;
            setOpenWorkout(result);
            addNewWorkout(result);
            return result;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function deleteWorkout(e, id) {
        e.stopPropagation();
        try {
            await axios.delete(window.$BACKEND_URI + "workouts/" + id);
            removeOldWorkout(id);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function updateWorkout(workout) {
        const backendWorkout = await updateExistingWorkout(workout);
        setOpenWorkout(backendWorkout);
        return backendWorkout;
    }

    function handleOpenWorkout(workout) {
        setOpenWorkout(workout);
        setShowWorkout(true);
        return;
    }

    const displayCards = workouts.map((card, i) => (
        <div
            className="workouts-card"
            key={i}
            draggable
            onClick={() => {
                if (card._id !== "637012e5c8e5bba98b4d3903")
                    handleOpenWorkout(card);
            }}
            onDragStart={(e) => {
                let val = JSON.stringify({ id: card._id, day: null });
                e.dataTransfer.setData("card", val);
            }}
        >
            {editingWorkouts && card._id !== "637012e5c8e5bba98b4d3903" && (
                <AiOutlineCloseCircle
                    className="workouts-card-delete"
                    size={25}
                    onClick={(e) => deleteWorkout(e, card._id)}
                />
            )}
            <div className="workouts-card-header">
                <div className="workouts-card-overflow">{card.name}</div>
            </div>
            <div className="workouts-card-body">
                {card.exercise_list.map((exercise, i) => (
                    <div className="workouts-card-exercise-container" key={i}>
                        <div className="workouts-card-exercise body-workouts-card-overflow">
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
                    setWorkout={setOpenWorkout}
                    createNewWorkout={createNewWorkout}
                />
            )}
            <WorkoutCalendar
                calendar={calendar}
                addToDay={addToDay}
                workouts={workouts}
                preview={false}
                handleOpenWorkout={handleOpenWorkout}
            />
            <div className="edit-cards-header">
                <div
                    className="workout-container-button"
                    style={{ marginRight: 50 }}
                    onClick={() => toggleShowWorkout()}
                >
                    <AiOutlinePlusCircle className="button-icon" size={20} />
                    <div>Create New Workout</div>
                </div>
                <div
                    className="workout-container-button"
                    onClick={() => setEditingWorkouts((prev) => !prev)}
                >
                    <AiOutlineEdit className="button-icon" size={20} />
                    <div>Remove A Workout</div>
                </div>
            </div>
            <div className="workouts-cards-container">{displayCards}</div>
        </div>
    );
}
