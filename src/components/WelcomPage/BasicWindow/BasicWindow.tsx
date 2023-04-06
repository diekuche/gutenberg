import React from "react";
import styles from "../../WelcomPage/BasicWindow/BasicWindow.module.css";

const BasicWindow = () => {
  return (
    <div className={styles.mainPageWelcomeBlock}>
      <div className={styles.mainPageWelcomeBlockinerInner}>
        <div className={styles.WelcomeBlockFirst}>
          unlock yourself, join the new world order!
        </div>
        <div className={styles.WelcomeBlockSecond}>
          create! <br /> manage! <br /> swap!
        </div>
        <div className={styles.WelcomeBlockThird}>
          All-in-One <br /> token hub
        </div>
      </div>
    </div >
  );
};

export default BasicWindow;
