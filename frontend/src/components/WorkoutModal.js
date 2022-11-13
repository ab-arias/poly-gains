import React from "react";
import {
    AiOutlineCloseCircle,
    AiOutlineCheckCircle,
    AiOutlineEdit,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import { v4 as uuid } from "uuid";

export default function WorkoutModal({
    toggle,
    updateWorkout,
    workout,
    setWorkout,
}) {
    const [editing, setEditing] = React.useState(workout ? false : true);
    const [id] = React.useState(workout ? workout._id : "");
    const [name, setName] = React.useState(workout ? workout.name : "");
    const [exercise_list, setExercise_list] = React.useState(
        workout ? workout.exercise_list : []
    );
    const [currExercise, setCurrExercise] = React.useState({
        exercise: "",
        sets: "",
        reps: "",
    });

    function handleModeToggle() {
        if (editing && workout) {
            updateWorkout({
                _id: id,
                name: name,
                exercise_list: exercise_list,
            });
            setEditing(false);
            return;
        }
        if (!editing) {
            setEditing(true);
            return;
        }
        if (!name) {
            return;
        }
        if (!workout) {
            updateWorkout({ name: name, exercise_list: exercise_list });
            setEditing(false);
            return;
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
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
        setExercise_list((prev) => [...prev, currExercise]);
        setCurrExercise({
            exercise: "",
            sets: "",
            reps: "",
        });
    }
    console.log(exercise_list);
    const exerciseCards = exercise_list.map((card) => (
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
                        className="workout-modal-name-input"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Workout Name"
                        maxLength={20}
                    />
                ) : (
                    <div className="modal-center-title">{name}</div>
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
