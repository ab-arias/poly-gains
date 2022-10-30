import React, {useState, useEffect} from 'react'
import StatTables from './StatTables';
import axios from 'axios';

export default function Stats() {

    const [stats, setStats] = useState([])

    async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:4000/stats');
           return response.data.stats_list;
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;
        }
     }

     useEffect(() => {
        fetchAll().then(result => {
           if (result)
            setStats(result)  
            });
      }, [] );
      
    
      return (
        <div className="container">
          <StatTables statsData={stats} />
        </div>
      );
    
}
