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
        let newRec = props.statsData.records;
        let idx = newRec.findIndex((x) => {
            return x.name === record.name;
        });
        if (idx === -1) {
            newRec.push(record);
        } else {
            newRec[idx] = record;
        }
        const newStats = { ...props.statsData, records: newRec };
        props.updateStats(newStats);
        setRecord({ name: "", pr: "", goal: "" });
        props.setAddWorkout(false);
    }

    return (
        <form className="update-stats-form">
            {/* <label htmlFor="name">Workout:</label> */}
            <input
                value={record.name}
                type="text"
                name="name"
                id="name"
                placeholder="name"
                style={{ width: "200px" }}
                onChange={handleChange}
            />

            {/* <label htmlFor="pr">New Pr:</label> */}
            <input
                value={record.pr}
                type="text"
                name="pr"
                id="pr"
                placeholder="PR"
                style={{ width: "100px" }}
                onChange={handleChange}
            />

            {/* <label htmlFor="pr">Goal:</label> */}
            <input
                value={record.goal}
                type="text"
                name="goal"
                id="goal"
                placeholder="Goal"
                style={{ width: "100px" }}
                onChange={handleChange}
            />
            <div class="form-row">
                <input
                    type="button"
                    value="Submit"
                    class="BMI-submit"
                    onClick={submitForm}
                    style={{ width: "250px", "margin-left": "25px" }}
                />
            </div>
        </form>
    );
}

export default StatForm;
