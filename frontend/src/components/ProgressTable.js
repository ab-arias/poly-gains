import React from "react";

<<<<<<< HEAD

function ProgressHeader(props) {
    const header = props.statsData.map((row) => {
      let headers = [];
      for (const x of row.records) {
        headers.push(
            <th>{x.name}</th>
        );
      }
      return <tr>
              <span></span>
                {headers}
             </tr>;
=======
function ProgressHeader(props) {
    const header = props.statsData.map((row) => {
        let headers = [];
        for (const x of row.records) {
            headers.push(<th>{x.name}</th>);
        }
        return (
            <tr>
                <span></span>
                {headers}
            </tr>
        );
>>>>>>> main
    });
    return <>{header}</>;
}

function PrBody(props) {
    const body = props.statsData.map((row) => {
<<<<<<< HEAD
      let prs = [];
      for (const x of row.records) {
        prs.push(
            <td>{x.pr}</td>
        );
      }
      return <>
                {prs}
             </>;
    });
    return <tr>
              <th>PR</th>
              {body}
           </tr>
=======
        let prs = [];
        for (const x of row.records) {
            prs.push(<td>{x.pr}</td>);
        }
        return <>{prs}</>;
    });
    return (
        <tr>
            <th>PR</th>
            {body}
        </tr>
    );
>>>>>>> main
}

function GoalBody(props) {
    const body = props.statsData.map((row) => {
<<<<<<< HEAD
      let goals = [];
      for (const x of row.records) {
        goals.push(
            <td>{x.goal}</td>
        );
      }
      return <>
                {goals}
             </>;
    });
    return <tr>
              <th>Goal</th>
              {body}
           </tr>
}

  function ProgressTable(props) {

=======
        let goals = [];
        for (const x of row.records) {
            goals.push(<td>{x.goal}</td>);
        }
        return <>{goals}</>;
    });
    return (
        <tr>
            <th>Goal</th>
            {body}
        </tr>
    );
}

function ProgressTable(props) {
>>>>>>> main
    return (
        <div className="profile-progress-container">
            <h2>My Progress</h2>
            <table>
<<<<<<< HEAD
              <tbody>
                <ProgressHeader statsData={props.statsData} />
                <PrBody statsData={props.statsData} />
                <GoalBody statsData={props.statsData} />
              </tbody>
            </table>
          </div>
    )
}

export default ProgressTable
=======
                <tbody>
                    <ProgressHeader statsData={props.statsData} />
                    <PrBody statsData={props.statsData} />
                    <GoalBody statsData={props.statsData} />
                </tbody>
            </table>
        </div>
    );
}

export default ProgressTable;
>>>>>>> main
