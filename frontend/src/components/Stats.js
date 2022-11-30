import React, { useState, useEffect } from "react";
import StatTables from "./StatTables";
import axios from "axios";

export default function Stats({ userToken }) {
    const [stats, setStats] = useState();
    const [records, setRecords] = useState();

    async function fetchUser() {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "user/" + userToken.id
            );
            return response.data.user;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchUser().then((result) => {
            if (result) {
                fetchStats(result.stats).then((result1) => {
                    if (result1) {
                        setRecords(result1.records)
                        setStats(result1);
                    }
                });
            }
        });
        // eslint-disable-next-line
    }, []);

    async function fetchStats(Id) {
        try {
            const response = await axios.get(
                window.$BACKEND_URI + "stats/" + Id
            );
            return response.data.stats_list;
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    async function updateStats(newStats) {
        console.log(newStats)
        const id = newStats[0]; 
        const newStat = newStats[1];
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "stats/" + id,
                newStat
            );
            const result = response.data;
            console.log(result)
            setRecords(result.records)
            setStats(result);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    return (
        (stats && records) && (
            <div className="container">
                <StatTables statsData={stats} updateStats={updateStats} 
                recordsData={records} setRecordsData={setRecords}/>
            </div>
        )
    );
}
