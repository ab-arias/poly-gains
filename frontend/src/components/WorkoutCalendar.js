import React, { useState } from "react";

export default function WorkoutCalendar({ handleOpenWorkout, preview }) {
    const restCard = {
        title: "Rest",
        exercises: [],
    };
    const [calendar, setCalendar] = useState({
        Sunday: restCard,
        Monday: restCard,
        Tuesday: restCard,
        Wednesday: restCard,
        Thursday: restCard,
        Friday: restCard,
        Saturday: restCard,
    });
    const currentDate = new Date();
    const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(currentDate);
    var lastSun = new Date();
    lastSun.setDate(lastSun.getDate() - lastSun.getDay());

    function addToDay(e, day) {
        let plan = JSON.parse(e.dataTransfer.getData("card"));
        console.log(plan);
        setCalendar({ ...calendar, [day]: plan });
    }

    const content = Object.entries(calendar).map(([day, plan], i) => {
        let dayOfWeek = new Date();
        dayOfWeek.setDate(lastSun.getDate() + i);
        return (
            <div
                className="workouts-calendar-entry"
                style={day === "Saturday" ? { borderRightWidth: "0" } : null}
                onDragOver={!preview ? (e) => e.preventDefault() : null}
                onDrop={!preview ? (e) => addToDay(e, day) : null}
            >
                <h3 className="workouts-calendar-date">
                    {dayOfWeek.getDate()}
                </h3>
                <h3 className="workouts-calendar-day">{day}</h3>
                <div
                    className={
                        currentDate.getDay() === dayOfWeek.getDay() &&
                        "workouts-calendar-current-day"
                    }
                >
                    <div
                        className="mini-workouts-card"
                        onClick={
                            !preview ? () => handleOpenWorkout(plan) : null
                        }
                    >
                        <div className="workouts-card-header">{plan.title}</div>
                        <div className="workouts-card-body">
                            {plan.exercises.map((exercise) => (
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
                </div>
            </div>
        );
    });

    return (
        <div className="workouts-calendar-container">
            {preview && <h2 className="section-header">My Workouts</h2>}
            <h2 className="calendar-month">{monthName}</h2>
            <div className="workouts-calendar">{content}</div>
        </div>
    );
}
