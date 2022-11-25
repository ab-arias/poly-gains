import React from "react";

function ProgressHeader(props) {
    let header = props.statsData.records?.map((record, i) => (
        <th key={i}>{record.name}</th>
    ));
    return (
        <tr>
            <th />
            {header}
        </tr>
    );
}

function PrBody(props) {
    const body = props.statsData.records?.map((record, i) => (
        <td key={i}>{record.pr}</td>
    ));
    return (
        <tr>
            <th>PR</th>
            {body}
        </tr>
    );
}

function GoalBody(props) {
    const body = props.statsData.records?.map((record, i) => (
        <td key={i}>{record.goal}</td>
    ));
    return (
        <tr>
            <th>Goal</th>
            {body}
        </tr>
    );
}

function ProgressTable({ statsData, otherName }) {
    return (
        <div className="profile-progress-container">
            <h2 className="section-header">
                {otherName ? `${otherName}'s` : "My"} Progress
            </h2>
            <table>
                <tbody>
                    <ProgressHeader statsData={statsData} />
                    <PrBody statsData={statsData} />
                    <GoalBody statsData={statsData} />
                </tbody>
            </table>
        </div>
    );
}

export default ProgressTable;
