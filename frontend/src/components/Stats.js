import React, { useState, useEffect } from "react";
import StatTables from "./StatTables";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState([]);

  async function fetchAll() {
    try {
      const response = await axios.get("http://localhost:4000/stats");
      return response.data.stats_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setStats(result);
    });
  }, []);

  async function updateStats(stats) {
    const id = stats[0];
    const records = stats[1];
    try {
      const response = await axios.post(
        "http://localhost:4000/stats/" + id,
        records
      );
      const result = response.data.stats_list;
      setStats(result);
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      <StatTables statsData={stats} updateStats={updateStats} />
    </div>
  );
}