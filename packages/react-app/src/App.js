import React from "react";
import { useEthers } from "@usedapp/core";

import { usePools } from "./hooks";
import styles from "./styles";
import { uniswapLogo } from "./assets";
import { Loader, Exchange, WalletButton } from "./components";

const App = () => {
  const { account } = useEthers();
  const [loading, pools] = usePools();

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={uniswapLogo}
            className="w-16 h-16 object-contain"
            alt="logo"
          />
          <WalletButton />
        </header>
        <div className={styles.exchangeContainer}>
          {/* title  */}
          <h1 className={styles.headTitle}>Uniswap x</h1>
          <p className={styles.subTitle}>Exchange tokens in seconds</p>

          {/* exchange box */}
          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                {account ? (
                  loading ? (
                    <Loader title="Loading pools.. one sec..." />
                  ) : (
                    <Exchange pools={pools} />
                  )
                ) : (
                  <Loader title="Please connect your wallet" />
                )}
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
