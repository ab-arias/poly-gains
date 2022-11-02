import React, { useState, useEffect } from "react";
import ProgressTable from "./ProgressTable";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile({ CalPolyLogo }) {
  const [stats, setStats] = useState([]);


  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:4000/stats");
      return response.data.stats_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setStats(result);
    });
  }, []);

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
          <ProgressTable statsData={stats} />
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
