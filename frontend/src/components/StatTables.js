import React from 'react';


function StatsBody(props) {
    const rows = props.statsData.map((row) => {
        let statrows = []
        for (const x of row.records){
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
        return (
            <div>
                {statrows}
            </div>
        );
    });
    return (
        <table>
            {rows}
        </table>
    );
}


function DietBody(props) {
    let diet = props.statsData.map((row) => {
        console.log(row.weight)
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

        )
    });
    return (
        <table>
            {diet}
        </table>
    );

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

                <div className = 'stats-update-form'>
                    <div>Update Stats</div>
                    <table>
                        <th>
                            <tr>Workout:</tr>
                            <tr>New PR:</tr>
                        </th>
                        <th>
                            <tr>enter workout name</tr>
                            <tr>enter new pr</tr>
                        </th>
                    </table>
                </div>
            </div>

            <div className = 'stats-conatiner-right'>

                <div className = 'stats-diet-table'> 
                    <div>Diet</div>
                    <table>
                        <DietBody statsData={props.statsData} />
                    </table>
                </div>

                <div className = 'stats-bmi-calculator' >
                    <div>BMI Calculator</div>
                    <table>
                        <th>
                            <tr>Weight:</tr>
                            <tr>Height:</tr>
                        </th>
                        <th>
                            <tr>enter weight</tr>
                            <tr>enter height</tr>
                        </th>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default StatTables;