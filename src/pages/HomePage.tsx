import React from "react";
import CounterPopulate from "../components/Counter/CounterPopulate";
import { AiFillDashboard } from "react-icons/ai";
import Graph from "../components/Graph/Graph";
import GenerateTable from "../components/Table/GenerateTable";

const HomePage = () => {
  return (
    <>
      <div>
        <CounterPopulate />
        <Graph />
        <GenerateTable />
      </div>
    </>
  );
};

export default HomePage;
