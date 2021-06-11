import { CounterTypes } from "../../@types/Counter";

import "./counter.css";

const Counter = ({
  name,
  count,
  Icon,
  gradientType,
  booleanField,
}: CounterTypes.props) => {
  const selectBGColor = () => {
    if (count === -1) {
      if (booleanField) {
        return "green";
      } else {
        return "red";
      }
    } else {
      return gradientType;
    }
  };
  return (
    <div
      style={{
        background: selectBGColor(),
        maxWidth: "180px",
        padding: "10px",
      }}
      className="Counter d-flex justify-content-around align-items-center m-2"
    >
      <div className="">
        {Icon && <Icon className="Counter__CounterIcon" />}
      </div>
      <div style={{ paddingLeft: "5px" }}>
        <p className="Counter__CounterName">{name}</p>
        <p>
          {count !== -1 && (
            <span className="Counter__CounterCount">{count}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Counter;
