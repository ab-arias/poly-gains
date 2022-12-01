import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

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
        <form className="stats-row">
            {/* <label htmlFor="name">Workout:</label> */}
            <input
                className="edit-stat-name"
                value={record.name}
                type="text"
                name="name"
                id="name"
                placeholder="Exercise"
                onChange={handleChange}
            />

            {/* <label htmlFor="pr">New Pr:</label> */}
            <input
                className="edit-stat-pr"
                value={record.pr}
                type="text"
                name="pr"
                id="pr"
                placeholder="PR"
                onChange={handleChange}
            />

            {/* <label htmlFor="pr">Goal:</label> */}
            <input
                className="edit-stat-goal"
                value={record.goal}
                type="text"
                name="goal"
                id="goal"
                placeholder="Goal"
                onChange={handleChange}
            />
            <AiOutlinePlusCircle
                className="delete-stat-button"
                onClick={submitForm}
            />
        </form>
    );
}

export default StatForm;
