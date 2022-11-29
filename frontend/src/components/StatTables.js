import React, { useState } from "react";
import StatForm from "./StatForm";
import {
    AiOutlinePlusCircle,
    AiOutlineEdit,
} from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";


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
    const [update, setUpdate] = useState()
    // const [rec, setRec] = useState(props.statsData.records);
    const [editing, setEditing] = useState(false);
    const [addStat, setAddStat] = useState(false);

    function handleNameChange(event, idx) {
        props.statsData.records[idx].name = event.target.value
        props.setRecordsData(props.statsData.records);
        setUpdate(event.target.value);
    }

    function handlePrChange(event, idx) {
        props.statsData.records[idx].pr = event.target.value
        props.setRecordsData(props.statsData.records);
        setUpdate(event.target.value);
    }

    function handleEditSave() {
        props.updateStats([props.statsData._id, props.recordsData]);
        setEditing((prev) => !prev);
        setAddStat(false);
    }

    const records = props.recordsData.map((row, i) => (
        <div className="stats-row" key={i}>
            <div>{row.name}:</div>
            <div>{row.pr} </div>
            {/* <div>{row.goal}</div> */}
        </div>
    ));

    function newStat() {
        setAddStat(true);
    }


    const editRecords = props.recordsData.map((row, i) => (
        <div className="stats-row" key={i}>
            <input
                className="edit-stat-name"
                name="name"
                value={row.name}
                onChange={event => handleNameChange(event, i) }
                placeholder="Name"
                maxLength={20}
                />
            {/* <div>{row.name}:</div> */}
            <input
                className="edit-stat-pr"
                name="pr"
                value={row.pr}
                onChange={event => handlePrChange(event, i)}
                placeholder="PR"
                maxLength={20}
                />
            {/* <div>{row.pr} </div> */}
            {/* <div>{row.goal}</div> */}
            <FiTrash2
                className="delete-stat-button"
                style={!editing ? { visibility: "hidden" } : null}
                onClick={() =>
                    props.updateStats([
                        props.statsData._id,
                        props.recordsData.filter(
                            (current) => row !== current
                        ),
                    ])
                }
            >
                Delete
            </FiTrash2>
        </div>
    ));

    return (
        <div className="stats-main-container">
            <h3
                className="section-header"
                style={{ width: "800px", fontSize: "50px" }}
            >
                Edit your stats
            </h3>
            <div className="stats-container-right">
                <div className="stats-pr-table">
                    <h3 class="sub-header" style={{'font-size': '35px'}}>Stats</h3>
                    <div class="stats-table-container">
                    <div class="stats-records">
                        {!editing ? records : editRecords} 
                        {(editing && !addStat) && (
                            <div
                                className="workout-container-button workout-modal-new-button"
                                onClick={newStat}>
                                <AiOutlinePlusCircle
                                    className="button-icon"
                                    size={20}
                                />
                                <div>Add New Stat</div>
                            </div>
                        )}
                        {(editing && addStat) && (
                            <StatForm
                            statsData={props.statsData}
                            updateStats={props.updateStats}
                            setAddWorkout={setAddStat}
                            />
                        )}
                    </div>
                        <AiOutlineEdit
                            className="edit-stats-button"
                            onClick={handleEditSave}
                        >
                            Edit
                        </AiOutlineEdit>
                        </div>
                </div>
            </div>

            <div className="stats-conatiner-left">
                <div className="stats-diet-table">
                    <DietBody
                        statsData={props.statsData}
                        updateStats={props.updateStats}
                    />
                </div>
            </div>

            <div className="stats-bmi-calculator">
                <div className="stats-header-row">
                    <h3 className="sub-header stats-header-text">
                        BMI Calculator
                    </h3>
                </div>
                <div className="BMI calculator">
                    <div className="weight-bmi">
                        <div className="bold-header">Weight:</div>
                        <input
                            id="weight-input-id"
                            type="text"
                            className="weight-lbs"
                        ></input>
                        <label htmlFor="weight-input-id"> lbs</label>
                    </div>
                    <div className="height-bmi">
                        <div className="bold-header">Height:</div>
                        <input
                            id="height-input-ft"
                            type="text"
                            className="height-ft"
                        ></input>
                        <label htmlFor="height-input-ft" className="label-ft">
                            ft
                        </label>
                        <input
                            id="height-input-in"
                            type="text"
                            className="height-in"
                        ></input>
                        <label htmlFor="height-input-in"> in</label>
                    </div>
                    <div className="bottom-bmi">
                        <button
                            className="BMI-submit"
                            style={{ marginTop: "30px" }}
                            onClick={calculateBMI}
                        >
                            Submit
                        </button>
                        <div className="bold-header">BMI:</div>
                        <input className="BMI-result" id="BMI-result"></input>
                        <label
                            id="BMI-health-label"
                            htmlFor="BMI-result"
                        ></label>
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
