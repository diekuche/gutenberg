import React from "react";
import styles from "../Legal Information/LegalInform.module.css";

const Legal = () => {
  return (
    <div className={styles.headlegal}>
      <div className={styles.legal}>Legal Information</div>
      <p className={styles.descript}>
        Gutenberg.tools is a decentralized application (dApp) where individuals,
        communities or smart contracts can create and manage tokens.
        <p>
          {" "}
          Gutenberg comes as open source software built on top of decentralized
          networks (blockchains) and provided “As Is” at your own risk, without
          warranties of any kind.
        </p>{" "}
        <p>
          Anyone can use Gutenberg's functionality without any restrictions. If
          your jurisdiction does not allow the use of decentralized
          applications, you must immediately stop using Gutenberg.
        </p>{" "}
        AS DESCRIBED IN THE DISCLAIMER, JUNOTOOLS IS PROVIDED “AS IS”, AT YOUR
        OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. No developer or entity
        involved in creating the JunoTools will be liable for any claims or
        damages whatsoever associated with your use, inability to use, or your
        interaction with other users of the JunoTools, including any direct,
        indirect, incidental, special, exemplary, punitive or consequential
        damages, or loss of profits, tokens, or anything else.
      </p>
    </div>
  );
};

export default Legal;
