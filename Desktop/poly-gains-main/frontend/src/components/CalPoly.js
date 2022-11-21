import React from "react";

export default function CalPoly() {
    return (
        <div className="CalPolyPage">
            <div className="CalPolyHeader">
                <div className="section-header">Cal Poly Fitness</div>
                <img
                    className="RecImg"
                    src={require("../assets/img/CalPolyRec.jpeg")}
                    alt="cannot display"
                ></img>
            </div>
            <div className="CalPolyAbout">
                <div className="CalPolyInfoSection">
                    <div className="sub-header">Rec Center Ammenities:</div>
                    <div className="ammenities">
                        -State-of-the-art equipment
                    </div>
                    <div className="ammenities">
                        -Complimentary group fitness classes
                    </div>
                    <div className="ammenities">-Multiple exercise rooms</div>
                    <div className="ammenities">-Indoor track</div>
                    <div className="ammenities">-Six gymnasium courts</div>
                    <div className="ammenities">-Six racquetball courts</div>
                    <div className="ammenities">
                        -Equipment check out at The Pro Shop
                    </div>
                    <div className="ammenities">-Olympic-size lap pool</div>
                    <div className="ammenities">-Leisure pool</div>
                    <div className="ammenities">-Sand volleyball courts</div>
                    <div className="ammenities">
                        -ASI Poly Escapes Climbing Park
                    </div>
                </div>
                <div className="CalPolyActSection">
                    <div className="sub-header">Operational Hours:</div>
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
            <div className="CalPolyCalendar">
                <h2 className="section-header">
                    Cal Poly Rec Center Calendar: November
                </h2>
            </div>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">1</h3>
                    <div className="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">2</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">3</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">4</h3>
                    <div className="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">5</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">6</h3>
                    <div className="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">7</h3>
                    <div className="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
            </div>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">8</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">9</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">10</h3>
                    <div className="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">11</h3>
                    <div className="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">12</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">13</h3>
                    <div className="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">14</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
            </div>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">15</h3>
                    <div className="mini-workouts-card"></div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">16</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">17</h3>
                    <div className="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">18</h3>
                    <div className="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">19</h3>
                    <div className="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">20</h3>
                    <div className="mini-workouts-card"></div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">21</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
            </div>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">22</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">23</h3>
                    <div className="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">24</h3>
                    <div className="mini-workouts-card"></div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">25</h3>
                    <div className="mini-workouts-card"></div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">26</h3>
                    <div className="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">27</h3>
                    <div className="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">28</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
            </div>
            <div className="workouts-calendar">
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">29</h3>
                    <div className="mini-workouts-card"></div>
                </div>
                <div className="workouts-calendar-entry">
                    <h3 className="workouts-calendar-day">30</h3>
                    <div className="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
