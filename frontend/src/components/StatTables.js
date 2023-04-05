import React, { useState } from "react";
import StatForm from "./StatForm";
import {
    AiOutlinePlusCircle,
    AiOutlineEdit,
    AiOutlineCheckCircle,
} from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

function DietForm({ dietForm, handleDietFormChange }) {
    return (
        <div className="diet-nums diet-rows">
            <div className="body-stats-row">
                <input
                    name="weight"
                    type="number"
                    className="body-stats-input weight-input"
                    value={dietForm.weight}
                    onChange={handleDietFormChange}
                />
                <label>lbs</label>
            </div>
            <div className="body-stats-row">
                <input
                    name="feet"
                    type="number"
                    className="body-stats-input feet-input"
                    value={dietForm.feet}
                    onChange={handleDietFormChange}
                />
                <label className="label-ft">ft</label>
                <input
                    name="inches"
                    type="number"
                    className="body-stats-input inches-input"
                    value={dietForm.inches}
                    onChange={handleDietFormChange}
                />
                <label>in</label>
            </div>
            <div>
                <input
                    name="calories"
                    type="number"
                    className="body-stats-input"
                    value={dietForm.calories}
                    onChange={handleDietFormChange}
                />
            </div>
            <div>
                <input
                    name="plan"
                    className="body-stats-input"
                    value={dietForm.plan}
                    onChange={handleDietFormChange}
                    maxLength={15}
                />
            </div>
        </div>
    );
}

function DietBody({ statsData, updateStats }) {
    const [editingDiet, setEditingDiet] = useState(false);
    const [dietForm, setDietForm] = useState({
        weight: statsData.weight,
        feet: Math.floor(statsData.height / 12),
        inches: statsData.height % 12,
        calories: statsData.calories,
        plan: statsData.plan,
    });

    function handleDietFormChange(e) {
        let { name, value } = e.target;
        if (name === "weight") {
            if (Number(value) <= 0) value = "";
            else if (Number(value) > 999) value = "999";
        } else if (name === "feet") {
            if (Number(value) <= 0) value = "";
            else if (Number(value) > 9) value = "9";
        } else if (name === "inches") {
            if (Number(value) <= 0) value = "";
            else if (Number(value) > 11) value = "11";
        } else if (name === "calories") {
            if (Number(value) <= 0) value = "";
            else if (Number(value) > 10000) value = "10000";
        }
        setDietForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function submitStats() {
        const weight = dietForm.weight !== "" ? dietForm.weight : "0";
        const feet = dietForm.feet !== "" ? dietForm.feet : "0";
        const inches = dietForm.inches !== "" ? dietForm.inches : "0";
        const calories = dietForm.calories !== "" ? dietForm.calories : "0";
        const plan = dietForm.weight !== "" ? dietForm.plan : "N/A";
        const newStats = {
            ...statsData,
            height: parseInt(feet) * 12 + parseInt(inches),
            weight: weight,
            calories: calories,
            plan: plan,
        };
        await updateStats(newStats);
        setEditingDiet(false);
    }

    return (
        <div>
            <div className="stats-header-row">
                <h3 className="sub-header stats-header-text">Diet</h3>
                {editingDiet ? (
                    <AiOutlineCheckCircle
                        className="edit-stats-button"
                        size={40}
                        onClick={submitStats}
                    />
                ) : (
                    <AiOutlineEdit
                        className="edit-stats-button"
                        size={40}
                        onClick={() => setEditingDiet(true)}
                    />
                )}
            </div>
            <div className="diet-container">
                <div className="diet-rows">
                    <div>Weight: </div>
                    <div>Height:</div>
                    <div>Calories:</div>
                    <div>Plan:</div>
                </div>
                {editingDiet ? (
                    <DietForm
                        dietForm={dietForm}
                        handleDietFormChange={handleDietFormChange}
                    />
                ) : (
                    <div className="diet-nums diet-rows">
                        <div>{statsData.weight} lbs</div>
                        <div>{statsData.height} inches</div>
                        <div>{statsData.calories}</div>
                        <div>{statsData.plan}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatTables(props) {
    const [editing, setEditing] = useState(false);
    const [addStat, setAddStat] = useState(false);

    function handleRecordChange(event, idx) {
        const { name, value } = event.target;
        props.statsData.records[idx][name] = event.target.value;
        const newRec = props.recordsData.map((rec, i) => {
            return i === idx ? { ...rec, [name]: value } : rec;
        });
        props.setRecordsData(newRec);
    }

    function handleEditSave() {
        props.statsData.records = props.recordsData;
        props.updateStats(props.statsData);
        setEditing((prev) => !prev);
        setAddStat(false);
    }

    const records = props.recordsData.map((row, i) => (
        <div className="stats-row" key={i}>
            <div className="stats-row-left">{row.name}:</div>
            <div className="stats-row-center">{row.pr} </div>
            <div className="stats-row-right">{row.goal}</div>
        </div>
    ));

    function newStat() {
        setAddStat(true);
    }

    function removeRecord(stat, row) {
        stat.records = stat.records.filter((current) => row !== current);
        return stat;
    }

    const editRecords = props.recordsData.map((row, i) => (
        <div className="stats-row" key={i}>
            <input
                className="edit-stat-name"
                name="name"
                value={row.name}
                onChange={(event) => handleRecordChange(event, i)}
                placeholder="Name"
                maxLength={20}
            />
            <input
                className="edit-stat-pr"
                name="pr"
                value={row.pr}
                onChange={(event) => handleRecordChange(event, i)}
                placeholder="PR"
                maxLength={20}
            />
            <input
                className="edit-stat-goal"
                name="goal"
                value={row.goal}
                onChange={(event) => handleRecordChange(event, i)}
                placeholder="Goal"
                maxLength={20}
            />
            <FiTrash2
                className="delete-stat-button"
                style={!editing ? { visibility: "hidden" } : null}
                onClick={() =>
                    props.updateStats(removeRecord(props.statsData, row))
                }
            >
                Delete
            </FiTrash2>
        </div>
    ));

    return (
        <div className="stats-main-container">
            <h3 className="section-header" style={{ fontSize: "50px" }}>
                Edit your stats
            </h3>

            <div className="stats-body-container">
                <div className="stats-container-left">
                    <div className="stats-diet-table">
                        <DietBody
                            statsData={props.statsData}
                            updateStats={props.updateStats}
                        />
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
                                <input
                                    className="BMI-result"
                                    id="BMI-result"
                                ></input>
                                <label
                                    id="BMI-health-label"
                                    htmlFor="BMI-result"
                                ></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stats-container-right">
                    <div className="stats-pr-table">
                        <div className="stats-header-row">
                            <h3 className="sub-header stats-header-text">
                                Stats
                            </h3>
                            {editing ? (
                                <AiOutlineCheckCircle
                                    className="edit-stats-button"
                                    size={40}
                                    onClick={handleEditSave}
                                />
                            ) : (
                                <AiOutlineEdit
                                    className="edit-stats-button"
                                    size={40}
                                    onClick={() => setEditing(true)}
                                />
                            )}
                        </div>
                        <div className="stats-table-container">
                            <div className="stats-records">
                                {!editing ? (
                                    <div>
                                        <div className="stats-row stats-row-header">
                                            <div className="stats-row-left"></div>
                                            <div className="stats-row-center">
                                                PR
                                            </div>
                                            <div className="stats-row-right">
                                                Goal
                                            </div>
                                        </div>
                                        {records}
                                    </div>
                                ) : (
                                    editRecords
                                )}
                                {editing && !addStat && (
                                    <div
                                        className="workout-container-button workout-modal-new-button"
                                        onClick={newStat}
                                    >
                                        <AiOutlinePlusCircle
                                            className="button-icon"
                                            size={20}
                                        />
                                        <div>Add New Stat</div>
                                    </div>
                                )}
                                {editing && addStat && (
                                    <StatForm
                                        statsData={props.statsData}
                                        updateStats={props.updateStats}
                                        setAddWorkout={setAddStat}
                                    />
                                )}
                            </div>
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
