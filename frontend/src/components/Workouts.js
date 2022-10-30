import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Workouts() {

    const [calendar, setCalendar] = useState({ Monday: "Rest", 
        Tuesday: "Rest", Wednesday: "Rest", Thursday: "Rest",
        Friday: "Rest", Saturday: "Rest", Sunday: "Rest"}
    )

    function addToDay(e, day){
        let plan = e.dataTransfer.getData('card')
        setCalendar({...calendar, [day]: plan})
    }

    const cardContent = ['card1', 'card2', 'card3', 'card4', 'Rest']

    const cards = cardContent.map(card => 
        <div className='workouts-card' 
            draggable
            onDragStart={(e) => e.dataTransfer.setData('card', card)}
        >
            {card}
        </div>
    )

    const content = Object.entries(calendar).map(([day, plan]) =>
        <div className='workouts-calendar-entry'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => addToDay(e, day)}
        >
            <h3 className='workouts-calendar-day'>{day}</h3>
            <div className='mini-workouts-card'>{plan}</div>
        </div>
    )

    return (
        <div className='workouts-main-container'>

            <div className='workouts-calendar-container'>
                <h2 className='section-header'>My Workouts</h2>
                <div className='workouts-calendar'>
                    {content}
                </div>
            </div>
            <div className='workouts-cards-container'>
                {cards}
                <div className='workouts-card'>
                    Create New Workout
                </div>
            </div>
        </div>
    )
}
