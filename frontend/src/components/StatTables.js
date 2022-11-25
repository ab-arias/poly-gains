import React, { useState } from "react";
import StatForm from "./StatForm";

function StatsBody(props) {
    const [editing, setEditing] = useState(false);

    const records = props.statsData.records.map((row, i) => (
        <div className="stats-row" key={i}>
            <div>{row.name}:</div>
            <div>{row.pr} lbs</div>
            <button
                className="delete-stat-button"
                style={!editing ? { visibility: "hidden" } : null}
                onClick={() =>
                    props.updateStats([
                        props.statsData._id,
                        props.statsData.records.filter(
                            (current) => row !== current
                        ),
                    ])
                }
            >
                Delete
            </button>
        </div>
    ));
    return (
        <div>
            <div>{records}</div>
            <button
                className="edit-stats-button"
                onClick={() => setEditing((prev) => !prev)}
            >
                Edit
            </button>
        </div>
    );
}

function DietBody(props) {
    return (
        <div className="diet-container">
            <div>
                <div>Weight: </div>
                <div>Height:</div>
                <div>Calories:</div>
                <div>Diet Plan:</div>
            </div>
            <div>
                <div>{props.statsData.weight} lbs</div>
                <div>{props.statsData.height} inches</div>
                <div>{props.statsData.calories}</div>
                <div>{props.statsData.plan}</div>
            </div>
        </div>
    );
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
                <h3 className="sub-header">Records</h3>
                    <StatsBody
                        statsData={props.statsData}
                        updateStats={props.updateStats}
                    />
                </div>

                <div className="stats-update-form">
                    <h3 className="sub-header">Update Stats</h3>
                    <StatForm
                        statsData={props.statsData}
                        updateStats={props.updateStats}
                    />
                </div>
            </div>

            <div className="stats-conatiner-right">
                <div className="stats-diet-table">
                <h3 className="sub-header">Stats</h3>
                    <DietBody statsData={props.statsData} />
                </div>

                <div className="stats-bmi-calculator">
                    <h3 className="sub-header">BMI Calculator</h3>
                    <div className="BMI calculator">
                        <div className="weight-bmi">
                            <div className="bold-header">Weight:</div>
                            <input
                                id="weight-input-id"
                                type="text"
                                className="weight-lbs"
                            ></input>
                            <label htmlFor="weight-input-id">lbs</label>
                        </div>
                        <div className="height-bmi">
                            <div className="bold-header">Height:</div>
                            <input
                                id="height-input-ft"
                                type="text"
                                className="height-ft"
                            ></input>
                            <label
                                htmlFor="height-input-ft"
                                className="label-ft"
                            >
                                ft
                            </label>
                            <input
                                id="height-input-in"
                                type="text"
                                className="height-in"
                            ></input>
                            <label htmlFor="height-input-in">in</label>
                        </div>
                        <div className="bottom-bmi">
                            <div className="bold-header">BMI:</div>
                            <input
                                className="BMI-result"
                                id="BMI-result"
                            ></input>
                            <label
                                id="BMI-health-label"
                                htmlFor="BMIresult"
                            ></label>
                            <button
                                className="BMI-submit"
                                onClick={calculateBMI}
                            >
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
