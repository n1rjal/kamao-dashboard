import React from "react";
import { JsxElement } from "typescript";

const LabelDiv = ({
  children,
  label,
}: {
  children: JsxElement;
  label: string;
}) => {
  return (
    <div
      className="LabelDiv"
      style={{
        backgroundColor: "#8CC749",
        padding: "5px",
        textAlign: "center",
      }}
    >
      <div className="">
        <h1 className="labeldiv__labelDivHeading">{label}</h1>
      </div>
      {children}
    </div>
  );
};

export default LabelDiv;
