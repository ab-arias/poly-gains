import React from "react";

function ProgressTable({ statsData, otherName }) {
    const content = statsData.records.map((rec, i) => (
        <div className="record-column" key={i}>
            <div className="record-header">{rec.name}</div>
            <div className="record-body">{rec.goal}</div>
            <div className="record-body">{rec.pr}</div>
        </div>
    ));

    return (
        <div className="profile-progress-container">
            {otherName ? null : <h2 className="section-header">My Progress</h2>}
            <div className="profile-progress-table">
                <div className="record-column">
                    <div style={{ height: 39 }}></div>
                    <div className="record-header">PR</div>
                    <div className="record-header">Goal</div>
                </div>
                <div className="content-container">{content}</div>
            </div>
        </div>
    );
}

export default ProgressTable;
