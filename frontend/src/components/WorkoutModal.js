import React from "react";
import {
    AiOutlineCloseCircle,
    AiOutlineCheckCircle,
    AiOutlinePlusCircle,
    AiOutlineEdit,
} from "react-icons/ai";

export default function WorkoutModal({
    toggle,
    updateWorkout,
    workout,
    createNewWorkout,
}) {
    const [editing, setEditing] = React.useState(workout ? false : true);
    const [name, setName] = React.useState(workout ? workout.name : "");
    const [exercise_list, setExercise_list] = React.useState(
        workout ? workout.exercise_list : []
    );
    const [currExercise, setCurrExercise] = React.useState({
        exercise: "",
        sets: "",
        reps: "",
    });

    function handleSave() {
        if (!name) return;
        else if (workout) {
            updateWorkout({
                ...workout,
                name: name,
                exercise_list: exercise_list,
            });
            setEditing(false);
            return;
        } else if (!workout) {
            createNewWorkout({ name: name, exercise_list: exercise_list });
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

    const exerciseCards = exercise_list.map((card, i) => (
        <div className="workout-modal-exercise-card" key={i}>
            <div className="workout-modal-exercise-header">{card.exercise}</div>
            <div className="workout-modal-exercise-body">
                {card.sets} sets x {card.reps} reps
            </div>
        </div>
    ));

    return (
        <div className="modal-screen">
            <div className="modal-header">
                <AiOutlineCloseCircle
                    className="modal-left-button"
                    size={35}
                    onClick={() => toggle()}
                />
                {editing ? (
                    <input
                        className="workout-modal-title-input"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Workout Name"
                        maxLength={20}
                    />
                ) : (
                    <div className="modal-center-title">{name}</div>
                )}
                {editing ? (
                    <AiOutlineCheckCircle
                        className="modal-right-button"
                        size={35}
                        onClick={handleSave}
                    />
                ) : (
                    <AiOutlineEdit
                        className="modal-right-button"
                        size={35}
                        onClick={() => setEditing(true)}
                    />
                )}
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
                {editing &&
                    currExercise.exercise &&
                    currExercise.sets &&
                    currExercise.reps && (
                        <div
                            className="workout-container-button workout-modal-new-button"
                            onClick={handleExerciseSubmission}
                        >
                            <AiOutlinePlusCircle
                                className="workout-container-button-icon"
                                size={20}
                            />
                            <div>Add New Exercise</div>
                        </div>
                    )}
            </div>
        </div>
    );
}
