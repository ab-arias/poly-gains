import React from "react";

export default function CalPoly() {
    return (
        <div className="CalPolyPage">
            <div className="CalPolyHeader">
                <h2 className="section-header">Cal Poly Fitness</h2>
                <img
                    className="RecImg"
                    src={require("../assets/img/CalPolyRec.jpeg")}
                    alt="cannot display"
                ></img>
                <div className="CalPolyAbout">
                    <div className="CalPolyInfoSection">
                        <h2 className="sub-header">Rec Center Ammenities:</h2>
                        <div className="ammenities">
                            -State-of-the-art equipment
                        </div>
                        <div className="ammenities">
                            -Complimentary group fitness classes
                        </div>
                        <div className="ammenities">
                            -Multiple exercise rooms
                        </div>
                        <div className="ammenities">-Indoor track</div>
                        <div className="ammenities">-Six gymnasium courts</div>
                        <div className="ammenities">
                            -Six racquetball courts
                        </div>
                        <div className="ammenities">
                            -Equipment check out at The Pro Shop
                        </div>
                        <div className="ammenities">-Olympic-size lap pool</div>
                        <div className="ammenities">-Leisure pool</div>
                        <div className="ammenities">
                            -Sand volleyball courts
                        </div>
                        <div className="ammenities">
                            -ASI Poly Escapes Climbing Park
                        </div>
                    </div>
                    <div className="CalPolyActSection">
                        <h2 className="sub-header">Operational Hours:</h2>
                        <div className="ammenities">
                            Monday - Friday: 6am - 12am
                        </div>
                        <div className="ammenities">
                            Saturday - Sunday: 8am - 10pm
                        </div>

                        <a
                            className="RecLink"
                            href="https://www.asi.calpoly.edu/facilities/recreation-center/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                className="RecWebImg"
                                src={require("../assets/img/RecWebsite.png")}
                                alt="cannot display"
                            ></img>
                        </a>
                    </div>
                </div>
            </div>
            <div className="CalPolyCalendar">
                <h2 className="section-header">
                    Cal Poly Rec Center Calendar: November
                </h2>
            </div>
            <h3 className="sub-header">Studio 1:</h3>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Monday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                9:15-10am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:30-5:15pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Tuesday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                6:45-7:30am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                11:15am-12:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:15-6:00pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Wednesday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                9:15-10:00am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:15-1:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:15-6:00pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Thursday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                6:45-7:30am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:30-5:15pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Friday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                6:45-7:30am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                11:15am-12:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:30-5:15pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Saturday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                10:15-11:00am
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Sunday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Breakaway
                            </div>
                            <div className="workouts-card-sets-reps">
                                10:15-11:00am
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="sub-header">Studio 2:</h3>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Monday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                8:45-9:45am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">Barre</div>
                            <div className="workouts-card-sets-reps">
                                10:10-10:55am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hatha Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:10-1:10pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Barre Connect
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:10-4:55pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Power Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:15-6:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">Salsa</div>
                            <div className="workouts-card-sets-reps">
                                6:30-7:30pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Tuesday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hatha Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                9:10-10:10am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Power Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:10-1:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:10-5:10pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Sculpt Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:30-6:30pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                7:00-8:00pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Wednesday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                8:45-9:45am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:10-1:10pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Barre Connect
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:10-4:55pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:15-6:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">Salsa</div>
                            <div className="workouts-card-sets-reps">
                                6:30-7:30pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Thursday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                9:10-10:10am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hatha Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:10-1:10pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Sculpt Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:30-6:30pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Friday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                8:45-9:45am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">Barre</div>
                            <div className="workouts-card-sets-reps">
                                10:10-10:55am
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hatha Yoga
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:10-1:10pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Vinyasa Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:15-6:15pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Saturday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Yoga Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                11:15am-12:15pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Sunday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Yoga Flow
                            </div>
                            <div className="workouts-card-sets-reps">
                                11:15am-12:15pm
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="sub-header">Studio 3:</h3>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Monday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:15-1:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Core and More
                            </div>
                            <div className="workouts-card-sets-reps">
                                1:30-2:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                H.I.I.T.
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:15-5:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hip Hop + Heels
                            </div>
                            <div className="workouts-card-sets-reps">
                                6:10-7:10pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Tuesday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                H.I.I.T.
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:15-1:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:15-5:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                H.I.I.T.
                            </div>
                            <div className="workouts-card-sets-reps">
                                5:30-6:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hip Hop + Heels
                            </div>
                            <div className="workouts-card-sets-reps">
                                7:30-8:30pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Wednesday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:15-1:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Core and More
                            </div>
                            <div className="workouts-card-sets-reps">
                                1:30-2:00pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:30-5:30pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Hip Hop + Heels
                            </div>
                            <div className="workouts-card-sets-reps">
                                6:10-7:10pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Thursday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                1:10-1:55pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                H.I.I.T
                            </div>
                            <div className="workouts-card-sets-reps">
                                4:14-5:00pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Friday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                12:15-1:15pm
                            </div>
                        </div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Core and More
                            </div>
                            <div className="workouts-card-sets-reps">
                                1:30-2:00pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Saturday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                        <div className="workouts-card-exercise-container">
                            <div className="workouts-card-exercise">
                                Body Pump
                            </div>
                            <div className="workouts-card-sets-reps">
                                9:00-10:00pm
                            </div>
                        </div>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <div className="workouts-calendar-header">
                        <h3 className="workouts-calendar-day">Sunday</h3>
                    </div>
                    <div className="workouts-card-body">
                        <div className="cp-width"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
