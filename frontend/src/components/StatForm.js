import React, { useState } from "react";

function StatForm(props) {
    const [record, setRecord] = useState({
        name: "",
        pr: "",
        goal: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "goal")
            setRecord({ name: record["name"], pr: record["pr"], goal: value });
        else if (name === "pr")
            setRecord({
                name: record["name"],
                pr: value,
                goal: record["goal"],
            });
        else setRecord({ name: value, pr: record["pr"], goal: record["goal"] });
    }

    function submitForm() {
        const newRec = props.statsData.map((elem) => {
            let idx = elem.records.findIndex((x) => {
                return x.name === record.name;
            });
            if (idx === -1) {
                elem.records.push(record);
            } else {
                elem.records[idx] = record;
            }
            return elem.records;
        });
        props.updateStats([props.statsData[0]._id, newRec[0]]);
        setRecord({ name: "", pr: "", goal: "" });
    }

    return (
        <div>
            <div class = "workout-form">
                <div class="bold-header">Workout:
                    <input
                            value={record.name}
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                    /> 
                </div>
            </div>
            <div>
                <div class="pr-form">
                    <div class="bold-header">New Pr:
                        <input
                            value={record.pr}
                            type="text"
                            name="pr"
                            id="pr"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div class="goal-form">
                        <div class="bold-header">Goal:
                            <input
                            value={record.goal}
                            type="text"
                            name="goal"
                            id="goal"
                            onChange={handleChange}
                            />
                        </div>
                    </div> 
            </div>
            <div>
                <button class="form-submit" onClick={submitForm}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default StatForm;
