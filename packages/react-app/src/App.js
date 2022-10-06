import React from "react";
import { useEthers } from "@usedapp/core";
import styles from "./styles";
import { uniswapLogo } from "./assets";

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={uniswapLogo}
            className="w-16 h-16 object-contain"
            alt="logo"
          />
          Wallet button
        </header>
        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>Uniswap x</h1>
          <p className={styles.subTitle}>Exchange tokens in seconds</p>
        </div>
      </div>
    </div>
  );
};

export default App;
