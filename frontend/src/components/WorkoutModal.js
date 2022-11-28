import React from "react";
import {
    AiOutlineCloseCircle,
    AiOutlineCheckCircle,
    AiOutlinePlusCircle,
    AiOutlineEdit,
} from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

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

    async function handleSave() {
        const cleanedExercises = exercise_list.filter(
            (ex) => ex.exercise && ex.sets && ex.reps
        );
        if (!name) return;
        else if (workout) {
            updateWorkout({
                ...workout,
                name: name,
                exercise_list: cleanedExercises,
            }).then((res) => {
                setExercise_list(res.exercise_list);
            });
            setEditing(false);
            return;
        } else if (!workout) {
            createNewWorkout({
                name: name,
                exercise_list: cleanedExercises,
            }).then((res) => {
                setExercise_list(res.exercise_list);
            });
            setEditing(false);
            return;
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleFormChange(index, e) {
        let { name, value } = e.target;
        if (name === "sets" || name === "reps") {
            if (Number(value) <= 0) value = "";
            else if (Number(value) > 999) value = "999";
        }
        let prev = [...exercise_list];
        prev[index][name] = value;
        setExercise_list(prev);
    }

    function addNewExercise() {
        setExercise_list((prev) => [
            ...prev,
            { exercise: "", sets: "", reps: "" },
        ]);
    }

    function removeExercise(index) {
        setExercise_list((old) => old.filter((val, i) => i !== index));
    }

    const exerciseCards = exercise_list.map((card, i) => (
        <div className="workout-modal-exercise-row" key={i}>
            <div className="workout-modal-exercise-header">{card.exercise}</div>
            <div className="workout-modal-exercise-body">
                {card.sets} sets x {card.reps} reps
            </div>
        </div>
    ));

    const inputCards = exercise_list.map((card, i) => (
        <div className="workout-modal-exercise-row" key={i}>
            <input
                className="workout-modal-input modal-exercise"
                name="exercise"
                value={card.exercise}
                onChange={(e) => handleFormChange(i, e)}
                placeholder="Exercise Name"
                maxLength={30}
            />
            <div className="workout-modal-exercise-body">
                <div className="workout-modal-set-rep">
                    <input
                        className="workout-modal-input modal-set"
                        name="sets"
                        type="number"
                        value={card.sets}
                        onChange={(e) => handleFormChange(i, e)}
                        placeholder="# of sets"
                        min="1"
                        max="999"
                    />
                    <span> x </span>
                    <input
                        className="workout-modal-input modal-rep"
                        name="reps"
                        type="number"
                        value={card.reps}
                        onChange={(e) => handleFormChange(i, e)}
                        placeholder="# of reps"
                        min="1"
                        max="999"
                    />
                </div>
                <FiTrash2
                    visibility={editing ? "visible" : "hidden"}
                    style={{ cursor: "pointer" }}
                    size={24}
                    onClick={() => removeExercise(i)}
                />
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
            <div className="modal-container">
                {editing ? inputCards : exerciseCards}
                {editing && (
                    <div
                        className="workout-container-button workout-modal-new-button"
                        onClick={addNewExercise}
                    >
                        <AiOutlinePlusCircle
                            className="button-icon"
                            size={20}
                        />
                        <div>Add New Exercise</div>
                    </div>
                )}
            </div>
        </div>
    );
}
