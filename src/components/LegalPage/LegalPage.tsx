import React from "react";
import styles from "../LegalPage/LegalPage.module.css";

const Legal = () => {
  return (
    <div className={styles.headLegal}>
      <div className={styles.legalInformation}>Terms of Use</div>
      <div className={styles.contentBlock}>
        <div className={styles.lastUpd}>
          Last update 04/04/2023
        </div>
        <div className={styles.content}>
          The following terms and conditions govern your use of the Gutenberg.tech website and associated application (the “App”). By accessing or using the App, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you may not access or use the App.

          <ol>
            <li>The App is an interface to third-party blockchains, and the authors of the App are not responsible for the accuracy, reliability, or legality of any information or transactions made through the App.</li>
            <li>The App is not a platform for creating or issuing securities or other financial instruments. Users of the App are solely responsible for ensuring that their use of the App complies with all applicable laws and regulations.</li>
            <li>The App may be used to create digital assets, but the authors of the App make no promises or guarantees regarding the value, performance, or reliability of any such assets created using the App. Users of the App are solely responsible for the obligations and liabilities associated with any assets they create using the App.</li>
            <li>The App is intended for general informational purposes only and does not constitute financial or investment advice. You should always do your own research and consult with a financial advisor before making any investment decisions.</li>
            <li>The App is provided “as is” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the App or the use or other dealings in the App.</li>
            <li>The App is licensed under the MIT License, and all rights not expressly granted by the License are reserved by the authors of the App.</li>
            <li>Any modifications made to the App must be clearly marked as such, and must not be represented as the original App.</li>
            <li>The App may not be used for any illegal or unethical purposes.</li>
            <li>The authors reserve the right to modify or discontinue the App at any time without notice.</li>
            <li>The App may contain links to third-party websites that are not owned or controlled by the authors of the App. The authors of the App have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. By using the App, you expressly relieve the authors of the App from any and all liability arising from your use of any third-party websites.</li>
            <li>The authors of the App may revise these terms of use at any time without notice. By using the App, you agree to be bound by the then-current version of these terms of use.</li>
            <li>The App is provided under the MIT License, a copy of which can be found at <a href="/license">license page</a>. By using the App, you agree to be bound by the terms and conditions of the MIT License.</li>
            <li>Use of the App implies agreement with these terms and conditions.</li>
          </ol>

          <p>
            By using the Gutenberg.tech website and App, you agree to the terms and conditions of this license. If you do not agree to the terms and conditions of this license, do not use the App.</p>
        </div>
      </div>
    </div >
  );
};

export default Legal;
