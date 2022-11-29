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
        props.updateStats([props.statsData._id, newRec]);
        setRecord({ name: "", pr: "", goal: "" });
    }

    return (
        <form className="update-stats-form">
            <div className="form-row">
                <label htmlFor="name">Workout:</label>
                <input
                    value={record.name}
                    type="text"
                    name="name"
                    id="name"
                    style={{width: '200px'}}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label htmlFor="pr">New Pr:</label>
                <input
                    value={record.pr}
                    type="text"
                    name="pr"
                    id="pr"
                    style={{width: '100px'}}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label htmlFor="pr">Goal:</label>
                <input
                    value={record.goal}
                    type="text"
                    name="goal"
                    id="goal"
                    style={{width: '100px'}}
                    onChange={handleChange}
                />
            </div>
            
            <input type="button" value="Submit" className="BMI-submit" onClick={submitForm} style={{width: '250px', marginLeft: '25px'}}/>
        </form>
    );
}

export default StatForm;
