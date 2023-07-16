import hammer from "ui/assets/Roadmap.svg";
import styles from "./Roadmap.module.css";

const RoadMap = () => (
  <div className={styles.RoadmapBlock}>
    <img src={hammer} className={styles.RoadmapImg} alt="RoadmapPreview" />
  </div>
);
export default RoadMap;
