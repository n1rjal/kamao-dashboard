import React, { useContext } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaBattleNet, FaUser } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { DataContext } from "../../contexts/DataContext";
import Counter from "./Counter";

const CounterPopulate = () => {
  const { documentCount } = useContext(DataContext);
  return (
    <>
      <div className="row my-4 justify-content-between">
        <Counter
          {...{
            name: "Videos",
            count: documentCount?.postCount || 0,
            Icon: BsCameraVideoFill,
            gradientType: "linear-gradient(90deg, #A18CD1 0%, #FBC2EB 100%)",
          }}
        />
        <Counter
          {...{
            name: "Competitions",
            count: documentCount?.competitionCount || 0,
            Icon: FaBattleNet,
            gradientType:
              "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
          }}
        />

        <Counter
          {...{
            name: "Users",
            count: documentCount?.userCount || 0,
            Icon: FaUser,
            gradientType: "linear-gradient(90deg, #4FACFE 0%, #00F2FE 100%)",
          }}
        />
        <Counter
          {...{
            name: "Companies",
            count: documentCount?.companyCount || 0,
            Icon: BiBuildingHouse,
            gradientType: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          }}
        />
      </div>
    </>
  );
};

export default CounterPopulate;
