import React from "react";
import BasicWindow from "./BasicWindow/BasicWindow";
import RoadMap from "./RoadMap/RoadMap";

const WelcomPage = () => {
  return (
    <div>
      <div>
        <BasicWindow />
      </div>
      <div>
        <RoadMap />
      </div>
    </div>
  );
};

export default WelcomPage;
