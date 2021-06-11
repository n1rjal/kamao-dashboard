import React from "react";
import "./detail.css";

const DetailCompetition = (props: Competition.CompeitionInterface) => {
  return (
    <div className="detailcompetition__Wrapper">
      <div
        style={{
          backgroundImage: `url(https://quotefancy.com/media/wallpaper/3840x2160/1830245-Bela-Karolyi-Quote-No-competition-no-progress.jpg)`,
        }}
        className="competition__CompetitionWallpaper"
      />
      <div className="detailcompetition__DetailCompetitionContainer">
        <h1 className="detailComponent__detailTitle">{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default DetailCompetition;
