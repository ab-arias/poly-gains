import React from "react";

export default function WorkoutCalendar({
    preview,
    workouts,
    calendar,
    addToDay,
    handleOpenWorkout,
    otherName,
}) {
    const currentDate = new Date();
    const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(currentDate);
    var lastMon = new Date();
    lastMon.setDate(lastMon.getDate() - ((lastMon.getDay() + 6) % 7));

    function getActiveWorkout(id) {
        const plan = workouts.find((elem) => elem._id === id);
        if (plan) {
            return plan;
        }
    }

    const content = Object.entries(calendar).map(([day, planId], i) => {
        const miniCard = getActiveWorkout(planId);
        let dayOfWeek = new Date();
        dayOfWeek.setDate(lastMon.getDate() + i);
        return (
            <div
                className="workouts-calendar-entry"
                style={day === "Sunday" ? { borderRightWidth: "0" } : null}
                onDragOver={!preview ? (e) => e.preventDefault() : null}
                onDrop={!preview ? (e) => addToDay(e, day) : null}
                key={day}
            >
                <div className="workouts-calendar-header">
                    <h3 className="workouts-calendar-date">
                        {dayOfWeek.getDate()}
                    </h3>
                    <h3 className="workouts-calendar-day">{day}</h3>
                </div>
                <div
                    className={
                        currentDate.getDay() === dayOfWeek.getDay()
                            ? "workouts-calendar-current-day"
                            : undefined
                    }
                >
                    <div
                        className="mini-workouts-card"
                        draggable
                        onDragStart={
                            !preview
                                ? (e) => {
                                      let val = JSON.stringify({
                                          id: planId,
                                          day: day,
                                      });
                                      e.dataTransfer.setData("card", val);
                                  }
                                : null
                        }
                        onClick={
                            !preview && planId !== "637012e5c8e5bba98b4d3903"
                                ? () => handleOpenWorkout(miniCard)
                                : null
                        }
                    >
                        <div className="workouts-card-header">
                            <div className="workouts-card-overflow">
                                {miniCard?.name}
                            </div>
                        </div>
                        <div className="workouts-card-body">
                            {miniCard?.exercise_list.map((exercise, i) => (
                                <div
                                    className="workouts-card-exercise-container"
                                    key={i}
                                >
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
            {preview && 
            <h2 className="section-header">
                { otherName ? `${otherName}'s` : "My" } Workouts
            </h2>}
            <h2 className="calendar-month">{monthName}</h2>
            <div className="workouts-calendar">{content}</div>
        </div>
    );
}
