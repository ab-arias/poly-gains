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
            return false;
        }
    }

    useEffect(() => {
        fetchUser().then((result) => {
            if (result) {
                fetchStats(result.stats).then((result1) => {
                    if (result1) {
                        setRecords(result1.records);
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
            return false;
        }
    }

    async function updateStats(newStats) {
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "stats/" + newStats._id,
                newStats
            );
            const result = response.data;
            setRecords(result.records);
            setStats(result);
        } catch (error) {
            return false;
        }
    }

    return (
        stats &&
        records && (
            <StatTables
                statsData={stats}
                updateStats={updateStats}
                recordsData={records}
                setRecordsData={setRecords}
            />
        )
    );
}
