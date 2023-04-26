import React, { useState } from "react";
import styles from "../Slider/Slider.module.css";

const MySlider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  const marks = [
    { value: 0, label: "0" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 75, label: "75" },
    { value: 100, label: "100" },
  ];

  return (
    <div className={styles.slider}>
      <input
        className={styles.customSlider}
        type="range"
        onChange={handleChange}
        min={1}
        max={100}
        step={1}
        value={value}
        list="step"
      ></input>
      <div className={styles.percent}>
        {marks.map((mark) => (
          <div key={mark.value}>{mark.label}</div>
        ))}
      </div>
    </div>
  );
};

export default MySlider;
