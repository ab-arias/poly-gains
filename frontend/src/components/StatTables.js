import React, { useEffect, useState } from "react";
import axios from "axios";
import StatForm from "./StatForm";

function StatsBody(props) {
    const [editing, setEditing] = useState(false);

    const rows = props.statsData.map((row) => {
        let statrows = [];
        for (const x of row.records) {
            statrows.push(
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <td>{x.name}:</td>
                            </th>
                            <th>
                                <td>{x.pr} lbs</td>
                            </th>
                            <th>
                                {editing && (
                                    <button
                                        class="delete-stat-button"
                                        onClick={() =>
                                            props.updateStats([
                                                row._id,
                                                row.records.filter(
                                                    (current) => x !== current
                                                ),
                                            ])
                                        }
                                    >
                                        Delete
                                    </button>
                                )}
                            </th>
                        </tr>
                    </tbody>
                </table>
            );
        }
        return <div>{statrows}</div>;
    });
    return (
        <div>
            <table>{rows}</table>
            <button
                ClassName="edit-stats-button"
                onClick={() => setEditing((prev) => !prev)}
            >
                Edit
            </button>
        </div>
    );
}

function DietBody(props) {
    let diet = props.statsData.map((row) => {
        return (
            <div>
                <table>
                    <thead>
                        <th>
                            <tr>Weight: </tr>
                            <tr>Height:</tr>
                            <tr>Calories:</tr>
                            <tr>Plan:</tr>
                        </th>
                        <th>
                            <tr>{row.weight} lbs</tr>
                            <tr>{row.height} inches</tr>
                            <tr>{row.calories}</tr>
                            <tr>{row.plan}</tr>
                        </th>
                    </thead>
                </table>
            </div>
        );
    });
    return <table>{diet}</table>;
}

function StatTables(props) {
    return (
        <div className="stats-main-container">
            <h2 className="section-header">
                {" "}
                Welcome User, Lets Get This Bread{" "}
            </h2>

            <div className="stats-container-left">
                <div className="stats-pr-table">
                    <div>Stats</div>
                    <table>
                        <StatsBody
                            statsData={props.statsData}
                            updateStats={props.updateStats}
                        />
                    </table>
                </div>

                <div className="stats-update-form">
                    <h3 class="sub-header">Update Stats</h3>
                    <StatForm
                        statsData={props.statsData}
                        updateStats={props.updateStats}
                    />
                </div>
            </div>

            <div className="stats-conatiner-right">
                <div className="stats-diet-table">
                    <div>Diet</div>
                    <table>
                        <DietBody statsData={props.statsData} />
                    </table>
                </div>

                <div className="stats-bmi-calculator">
                    <h3 class="sub-header">BMI Calculator</h3>
                    <div class="BMI calculator">
                        <div class="weight-bmi">
                            <div class="bold-header">Weight:</div>
                            <input
                                id="weight-input-id"
                                type="text"
                                class="weight-lbs"
                            ></input>
                            <label for="weight-input-id">lbs</label>
                        </div>
                        <div class="height-bmi">
                            <div class="bold-header">Height:</div>
                            <input
                                id="height-input-ft"
                                type="text"
                                class="height-ft"
                            ></input>
                            <label for="height-input-ft" class="label-ft">
                                ft
                            </label>
                            <input
                                id="height-input-in"
                                type="text"
                                class="height-in"
                            ></input>
                            <label for="height-input-in">in</label>
                        </div>
                        <div class="bottom-bmi">
                            <div class="bold-header">BMI:</div>
                            <input class="BMI-result" id="BMI-result"></input>
                            <label
                                id="BMI-health-label"
                                for="BMIresult"
                            ></label>
                            <button class="BMI-submit" onClick={calculateBMI}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function calculateBMI() {
    const bmi =
        (Number(document.getElementById("weight-input-id").value) /
            (Number(document.getElementById("height-input-ft").value * 12) +
                Number(document.getElementById("height-input-in").value)) **
                2) *
        703;
    document.getElementById("BMI-result").value = Math.round(bmi * 100) / 100;
    if (bmi < 18.5) {
        document.getElementById("BMI-health-label").textContent = "Underweight";
    } else if (bmi > 18.5 && bmi < 24.99999) {
        document.getElementById("BMI-health-label").textContent = "Healthy";
    } else if (bmi > 25.0 && bmi < 29.99999) {
        document.getElementById("BMI-health-label").textContent = "Overweight";
    } else if (bmi > 30) {
        document.getElementById("BMI-health-label").textContent = "Obese";
    } else {
        document.getElementById("BMI-health-label").textContent = "Error";
    }
}

export default StatTables;
