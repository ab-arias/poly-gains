import React from 'react'

export default function Stats() {
    return (
        <div className = 'stats-main-container'>
            
            <h2 className = 'section-header'> Welcome User, Lets Get This Bread </h2>

            <div className='stats-container-left'>
                <div className = 'stats-pr-table'>
                    <div>Stats</div>
                    <table>
                        <th>
                            <tr>Bench PR:</tr>
                            <tr>Squat PR:</tr>
                            <tr>Deadlift PR:</tr>
                        </th>
                        <th>
                            <tr>135</tr>
                            <tr>225</tr>
                            <tr>315</tr>
                        </th>
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
                        <th>
                            <tr>Weight:</tr>
                            <tr>Calories:</tr>
                            <tr>Plan:</tr>
                        </th>
                        <th>
                            <tr>170</tr>
                            <tr>3000</tr>
                            <tr>Bulk</tr>
                        </th>
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
