import React from "react";
import { Link } from "react-router-dom";

export default function Profile({ CalPolyLogo }) {
  return (
    <div className="profile-main-container">
      <img
        className="profile-avatar"
        src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png"
        alt="Cannot display"
      />
      <h2>User's Name</h2>

      <div className="center-dashboard">
        <Link className="link-container" to="/stats">
          <div className="profile-progress-container">
            <h2>My Progress</h2>
            <table>
              <tr>
                <span></span>
                <th>Bench</th>
                <th>Squat</th>
                <th>Deadlift</th>
              </tr>
              <tr>
                <th>PR</th>
                <td>245</td>
                <td>295</td>
                <td>345</td>
              </tr>
              <tr>
                <th>Goal</th>
                <td>315</td>
                <td>405</td>
                <td>465</td>
              </tr>
            </table>
          </div>
        </Link>

        <div className="dashboard-buttons-container">
          <Link className="link-container" to="/editprofile">
            <div className="update-profile-button">
              <img
                className="profile-button-avatar"
                src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png"
                alt="Cannot display"
              />
              <h3>Edit Profile</h3>
            </div>
          </Link>
          <Link className="link-container" to="/calpoly">
            <div className="calpoly-button">
              <img
                className="calpoly-logo"
                src={require("../assets/img/CalPolyLogo.png")}
                alt="Cannot display"
              />
              <h3>Cal Poly Resources</h3>
            </div>
          </Link>
        </div>
      </div>

      <Link className="link-container" to="/workouts">
        <div className="profile-calendar-container">
          <h2>My Workouts</h2>
          <table>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>Workout Card</td>
              <td>Workout Card</td>
              <td>Workout Card</td>
              <td>Workout Card</td>
              <td>Workout Card</td>
              <td>Workout Card</td>
              <td>Workout Card</td>
            </tr>
          </table>
        </div>
      </Link>
    </div>
  );
}
