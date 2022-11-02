import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import WorkoutModal from "./WorkoutModal";

export default function Workouts() {
  const restCard = {
    title: "Rest",
    exercises: [],
  };

  const [showWorkout, setShowWorkout] = useState(false);
  const [openWorkout, setOpenWorkout] = useState(null);
  const [calendar, setCalendar] = useState({
    Monday: restCard,
    Tuesday: restCard,
    Wednesday: restCard,
    Thursday: restCard,
    Friday: restCard,
    Saturday: restCard,
    Sunday: restCard,
  });
  const [workoutCards, setWorkoutCards] = useState([]);

  function toggleShowWorkout() {
    setShowWorkout((prevStatus) => !prevStatus);
    if (openWorkout) setOpenWorkout(null);
  }

  function addToDay(e, day) {
    let plan = JSON.parse(e.dataTransfer.getData("card"));
    console.log(plan);
    setCalendar({ ...calendar, [day]: plan });
  }

  function updateWorkout(workout) {
    console.log(workout);
    setWorkoutCards((prev) => [workout, ...prev]);
  }

  function handleOpenWorkout(workout) {
    setOpenWorkout(workout);
    setShowWorkout(true);
  }

    const cards = workoutCards.map(card => 
        <div className='workouts-card' 
            draggable
            onClick={() => handleOpenWorkout(card)}
            onDragStart={(e) => {
                let val = JSON.stringify(card)
                e.dataTransfer.setData('card', val)
            }}
        >
            <div className='workouts-card-header'>
                {card.title}
            </div>
            <div className='workouts-card-body'>
                {card.exercises.map(exercise => 
                    <div className='workouts-card-exercise-container'>
                        <div className='workouts-card-exercise'>
                            {exercise.exercise}
                        </div>
                        <div className='workouts-card-sets-reps'>
                            {exercise.sets} 
                            <span> sets x </span>
                            {exercise.reps}
                            <span> reps</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

  const content = Object.entries(calendar).map(([day, plan]) => (
    <div
      className="workouts-calendar-entry"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => addToDay(e, day)}
    >
      <h3 className="workouts-calendar-day">{day}</h3>
      <div className="mini-workouts-card">{plan.title}</div>
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
      <div className="workouts-calendar-container">
        <h2 className="section-header">My Workouts</h2>
        <div className="workouts-calendar">{content}</div>
      </div>
      <div className="workouts-cards-container">
        {cards}
        <div className="workouts-card" onClick={() => toggleShowWorkout()}>
          Create New Workout
        </div>
      </div>
    </div>
  );
}
