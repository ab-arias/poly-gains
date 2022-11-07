import React from "react";
import StatForm from "./StatForm";

function StatsBody(props) {
  const rows = props.statsData.map((row) => {
    let statrows = [];
    for (const x of row.records) {
      statrows.push(
        <tr>
          <th>
            <td>{x.name}:</td>
          </th>
          <th>
            <td>{x.pr} lbs</td>
          </th>
        </tr>
      );
    }
    return <div>{statrows}</div>;
  });
  return <table>{rows}</table>;
}

function DietBody(props) {
  let diet = props.statsData.map((row) => {
    return (
      <div>
        <th>
          <tr>Weight: </tr>
          <tr>Height:</tr>
          <tr>Calories:</tr>
          <tr>Plan:</tr>
        </th>
        <th>
          <tr>{row.weight} lbs</tr>
          <tr>{row.height} inches</tr>
          <tr>{row.calories}</tr>
          <tr>{row.plan}</tr>
        </th>
      </div>
    );
  });
  return <table>{diet}</table>;
}

function StatTables(props) {

    return (
        <div className = 'stats-main-container'>
            
            <h2 className = 'section-header'> Welcome User, Lets Get This Bread </h2>

            <div className='stats-container-left'>
                <div className = 'stats-pr-table'>
                    <div>Stats</div>
                    <table>
                        <StatsBody statsData={props.statsData} />
                    </table>
                    
                </div>

        <div className="stats-update-form">
          <div>Update Stats</div>
          <StatForm
            statsData={props.statsData}
            updateStats={props.updateStats}
          />
        </div>
      </div>

      <div className="stats-conatiner-right">
        <div className="stats-diet-table">
          <div>Diet</div>
          <table>
            <DietBody statsData={props.statsData} />
          </table>
        </div>

                <div className = 'stats-bmi-calculator' >
                    <h3 class="sub-header">BMI Calculator</h3>
                    <div class="BMI calculator">
                        <div class="weight-bmi">
                            <p>weight:</p>
                            <input id="weight-input-id" type="text" class="weight-lbs"></input>
                            <label for="weight-input-id">lbs</label>
                        </div>
                        <div class="height-bmi">
                            <p>height:</p>
                            <input id="height-input-ft" type="text" class="height-ft"></input>
                            <label for="height-input-ft" class="label-ft">ft</label>
                            <input id="height-input-in" type="text" class="height-in"></input>
                            <label for="height-input-in">in</label>
                        </div>
                        <div class="bottom-bmi">
                            <p>BMI:</p>
                            <input id="BMI-result"></input>
                            <label id ="BMI-health-label" for="BMIresult"></label>
                            <button class="BMI-submit" onClick={calculateBMI}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

function calculateBMI(){
    const bmi = (Number(document.getElementById("weight-input-id").value) /
            ((Number(document.getElementById("height-input-ft").value * 12) + Number(document.getElementById("height-input-in").value)) ** 2)) * 703;
    document.getElementById("BMI-result").value = bmi;
    if (bmi < 18.5) {
        document.getElementById("BMI-health-label").textContent = "underweight";
    }
    else if ((bmi > 18.5) && (bmi < 24.99999)){
        document.getElementById("BMI-health-label").textContent = "healthy";
    }
    else if ((bmi > 25.0) && (bmi < 29.99999)){
        document.getElementById("BMI-health-label").textContent = "overweight";
    }
    else if (bmi > 30) {
        document.getElementById("BMI-health-label").textContent = "Obese";
    }
    else {
        document.getElementById("BMI-health-label").textContent = "error";
    }
}

export default StatTables;
