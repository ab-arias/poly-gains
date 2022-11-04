import React, { useState } from 'react'


function StatForm(props) {

    const [record, setRecord] = useState(
        {
            name: '',
            pr: '',
            goal: ''
        }
    )


    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "goal")
            setRecord(
              {name: record['name'], pr: record['pr'], goal: value}
           );
        else if (name === "pr") 
            setRecord(
                {name: record['name'], pr: value, goal: record['goal']}
            ); 
        else 
            setRecord(
                {name: value, pr: record['pr'], goal: record['goal']}
            );
      }


    function submitForm() {
        const newRec = props.statsData.map((elem) => {
                let idx =  elem.records.findIndex((x) => {return x.name === record.name});
                if (idx === -1) {
                    elem.records.push(record);
                } else {
                    elem.records[idx] = record;
                }
                return elem.records;
            }
        )
        props.updateStats([props.statsData[0]._id, newRec[0]]);
        setRecord({name: '', pr: '', goal: ''});
    }

    return(

        <form>
            <th>
            <tr>
            <td>
            <label htmlFor="name">Workout:</label>
            <input
                value={record.name}
                type="text"
                name="name"
                id="name"
                onChange={handleChange} 
                />
                </td>
            </tr>
            <tr>
          <label htmlFor="pr">New Pr:</label>
          <input
            value={record.pr}
            type="text"
            name="pr"
            id="pr"
            onChange={handleChange}  
            />
            </tr>
            <tr>
            <label htmlFor="pr">Goal:</label>
            <input
            value={record.goal}
            type="text"
            name="goal"
            id="goal"
            onChange={handleChange} 
            />
            </tr>
            </th>
            <input type="button" value="Submit"  onClick={submitForm}/>
        </form>
    )

}

export default StatForm;