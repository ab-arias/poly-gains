import React from "react";

export default function CalPoly() {
    return (
        <div class="CalPolyPage">
            <div class="CalPolyHeader">
                <div class="section-header">Cal Poly Fitness</div>
                <img
                    class="RecImg"
                    src={require("../assets/img/CalPolyRec.jpeg")}
                    alt="cannot display"
                ></img>
            </div>
            <div class="CalPolyAbout">
                <div class="CalPolyInfoSection">
                    <div class="sub-header">Rec Center Ammenities:</div>
                    <div class="ammenities">-State-of-the-art equipment</div>
                    <div class="ammenities">
                        -Complimentary group fitness classes
                    </div>
                    <div class="ammenities">-Multiple exercise rooms</div>
                    <div class="ammenities">-Indoor track</div>
                    <div class="ammenities">-Six gymnasium courts</div>
                    <div class="ammenities">-Six racquetball courts</div>
                    <div class="ammenities">
                        -Equipment check out at The Pro Shop
                    </div>
                    <div class="ammenities">-Olympic-size lap pool</div>
                    <div class="ammenities">-Leisure pool</div>
                    <div class="ammenities">-Sand volleyball courts</div>
                    <div class="ammenities">
                        -ASI Poly Escapes Climbing Park
                    </div>
                </div>
                <div class="CalPolyActSection">
                    <div class="sub-header">Operational Hours:</div>
                    <div class="ammenities">Monday - Friday: 6am - 12am</div>
                    <div class="ammenities">Saturday - Sunday: 8am - 10pm</div>

                    <a
                        class="RecLink"
                        href="https://www.asi.calpoly.edu/facilities/recreation-center/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            class="RecWebImg"
                            src={require("../assets/img/RecWebsite.png")}
                            alt="cannot display"
                        ></img>
                    </a>
                </div>
            </div>
            <div class="CalPolyCalendar">
                <h2 class="section-header">
                    Cal Poly Rec Center Calendar: November
                </h2>
            </div>
            <div class="workouts-calendar">
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">1</h3>
                    <div class="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">2</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">3</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">4</h3>
                    <div class="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">5</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">6</h3>
                    <div class="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">7</h3>
                    <div class="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
            </div>
            <div class="workouts-calendar">
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">8</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">9</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">10</h3>
                    <div class="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">11</h3>
                    <div class="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">12</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">13</h3>
                    <div class="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">14</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
            </div>
            <div class="workouts-calendar">
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">15</h3>
                    <div class="mini-workouts-card"></div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">16</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">17</h3>
                    <div class="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">18</h3>
                    <div class="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">19</h3>
                    <div class="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">20</h3>
                    <div class="mini-workouts-card"></div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">21</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
            </div>
            <div class="workouts-calendar">
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">22</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">23</h3>
                    <div class="mini-workouts-card">
                        <p>Barre 1PM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">24</h3>
                    <div class="mini-workouts-card"></div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">25</h3>
                    <div class="mini-workouts-card"></div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">26</h3>
                    <div class="mini-workouts-card">
                        <p>Yoga 8AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">27</h3>
                    <div class="mini-workouts-card">
                        <p>Body Pump 1PM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">28</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>HIIT 11AM</p>
                    </div>
                </div>
            </div>
            <div class="workouts-calendar">
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">29</h3>
                    <div class="mini-workouts-card"></div>
                </div>
                <div class="workouts-calendar-entry">
                    <h3 class="workouts-calendar-day">30</h3>
                    <div class="mini-workouts-card">
                        <p>Spin Class 9AM</p>
                        <p>Body Pump 1PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
