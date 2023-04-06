import React from "react";
import styles from "../../WelcomPage/RoadMap/RoadMap.module.css";
import hammer from "../../../assets/Roadmap.svg";

const RoadMap = () => {
  return (
    <div className={styles.RoadmapBlock}>
      <img src={hammer} className={styles.RoadmapImg} alt="RoadmapPreview"></img>
    </div>
  );
};
export default RoadMap;