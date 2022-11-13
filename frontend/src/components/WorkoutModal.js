import React from "react";
import {
    AiOutlineCloseCircle,
    AiOutlineCheckCircle,
    AiOutlineEdit,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { v4 as uuid } from "uuid";

export default function WorkoutModal({ toggle, updateWorkout, workout }) {
    const [editing, setEditing] = React.useState(workout ? false : true);
    const [title, setTitle] = React.useState(workout ? workout.title : "");
    const [exercises, setExercises] = React.useState(
        workout ? workout.exercises : []
    );
    const [currExercise, setCurrExercise] = React.useState({
        id: "",
        exercise: "",
        sets: "",
        reps: "",
    });

    function handleModeToggle() {
        if (!editing) {
            setEditing(true);
            return;
        }
        if (!title) {
            return;
        }
        if (!workout) {
            updateWorkout({ id: uuid(), title: title, exercises: exercises });
        }
        setEditing(false);
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleExerciseChange(event) {
        let { name, value } = event.target;
        if (name === "sets" || name === "reps") {
            if (Number(value) <= 0) value = "";
            else if (Number(value) > 999) value = "999";
        }
        if (!currExercise.id) {
            setCurrExercise((prev) => ({ ...prev, id: uuid() }));
        }
        setCurrExercise((prev) => ({ ...prev, [name]: value }));
    }

    function handleExerciseSubmission() {
        setExercises((prev) => [...prev, currExercise]);
        setCurrExercise({
            id: "",
            exercise: "",
            sets: "",
            reps: "",
        });
    }

    const exerciseCards = exercises.map((card) => (
        <div className="workout-modal-exercise-card" key={card.id}>
            <div className="workout-modal-exercise-header">{card.exercise}</div>
            <div className="workout-modal-exercise-body">
                {card.sets} sets x {card.reps} reps
            </div>
        </div>
    ));

    return (
        <div className="modal-screen">
            <div className="modal-header">
                <IconContext.Provider value={{ color: "white", size: "35px" }}>
                    <div className="modal-left-button" onClick={() => toggle()}>
                        <AiOutlineCloseCircle />
                    </div>
                </IconContext.Provider>
                {editing ? (
                    <input
                        className="workout-modal-title-input"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Workout Title"
                        maxLength={20}
                    />
                ) : (
                    <div className="modal-center-title">{title}</div>
                )}
                <IconContext.Provider value={{ color: "white", size: "35px" }}>
                    <div
                        className="modal-right-button"
                        onClick={handleModeToggle}
                    >
                        {editing ? <AiOutlineCheckCircle /> : <AiOutlineEdit />}
                    </div>
                </IconContext.Provider>
            </div>
            <div className="workout-modal-container">
                {exerciseCards}
                {editing && (
                    <div className="workout-modal-exercise-card">
                        <input
                            className="workout-modal-exercise-input"
                            name="exercise"
                            value={currExercise.exercise}
                            onChange={handleExerciseChange}
                            placeholder="Exercise Name"
                            maxLength={20}
                        />
                        <div className="workout-modal-set-rep">
                            <input
                                className="workout-modal-set-rep-input"
                                name="sets"
                                type="number"
                                value={currExercise.sets}
                                onChange={handleExerciseChange}
                                placeholder="# of sets"
                                min="1"
                                max="999"
                            />
                            <span> x </span>
                            <input
                                className="workout-modal-set-rep-input"
                                name="reps"
                                type="number"
                                value={currExercise.reps}
                                onChange={handleExerciseChange}
                                placeholder="# of reps"
                                min="1"
                                max="999"
                            />
                        </div>
                    </div>
                )}
                {editing && (
                    <button
                        style={{ marginLeft: 10 }}
                        onClick={handleExerciseSubmission}
                    >
                        Add New Exercise
                    </button>
                )}
            </div>
        </div>
    );
}
