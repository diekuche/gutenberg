import React from "react";
import styles from "../LegalPage/LegalPage.module.css";

const License = () => {
  return (
    <div className={styles.headLegal}>
      <div className={styles.legalInformation}>license</div>
      <div className={styles.contentBlock}>
        <div className={styles.lastUpd}>
          Last update 04/04/2023
        </div>
        <div className={styles.content}>
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of the Gutenberg.tech web application and associated documentation
          files (the "App"), to deal in the App without restriction, including without
          limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
          and/or sell copies of the App, and to permit persons to whom the App is furnished
          to do so, subject to the following conditions:
          <ol>
            <li>The App was developed by the die_Küche team with the assistance of artificial intelligence (AI).</li>
            <li>The App is an interface to third-party blockchains.</li>
            <li>The App is intended for free distribution and use. The App is available for viewing for use on a royalty-free basis. During the use of the App, a fee may be charged for certain blockchain interaction functions.</li>
            <li>The authors of the App reserve all proprietary and non-proprietary rights to the visual and textual materials, as well as the App's code.</li>
            <li>The App uses third-party libraries, all rights to which belong to their authors.</li>
            <li>The App is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the App or the use or other dealings in the App.</li>
            <li>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the App.</li>
            <li>Any modifications made to the App must be clearly marked as such, and must not be represented as the original App.</li>
            <li>The App may not be used for any illegal or unethical purposes.</li>
            <li>The authors reserve the right to modify or discontinue the App at any time without notice.</li>
          </ol>
        </div>
      </div>
    </div >
  );
};

export default License;
