import { useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { abis } from "@my-app/contracts";
import {
  ERC20,
  useContractFunction,
  useEthers,
  useTokenAllowance,
  useTokenBalance,
} from "@usedapp/core";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { ROUTER_ADDRESS } from "../config";
import { AmountIn, AmountOut, Balance } from "./";
import styles from "../styles";
import {
  getAvailableTokens,
  getCounterpartTokens,
  findPoolByTokens,
  isOperationPending,
  getFailureMessage,
  getSuccessMessage,
} from "../utils";

const Exchange = ({ pools }) => {
  // TODO
  const isApproving = isOperationPending("approve");
  const isSwapping = isOperationPending("swap");
  // const successMessage = getSuccessMessage();
  // const failureMessage = getFailureMessage();

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8">
        <AmountIn />
        <Balance />
      </div>
      <div className="mb-8 w-[100%]">
        <AmountOut />
        <Balance />
      </div>
      {/* button */}
      {"approvedNeeded" && !isSwapping ? (
        <button
          className={`
            ${
              "canApprove"
                ? "bg-site-pink text-white"
                : "bg-site-dim2 text-site-dim2"
            } ${styles.actionButton}`}
          disabled={!"canApprove"}
          onClick={() => {}}
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>
      ) : (
        <button
          className={`
        ${
          "canSwap" ? "bg-site-pink text-white" : "bg-site-dim2 text-site-dim2"
        } ${styles.actionButton}`}
          disabled={!"canSwap"}
          onClick={() => {}}
        >
          {isSwapping
            ? "Swapping..."
            : "hasEnoughBalance"
            ? "Swap"
            : "Insufficient Balance"}
        </button>
      )}

      {"failureMessage" && !"resetState" ? (
        <p className={styles.message}>{"failureMessage"}</p>
      ) : "successMessage" ? (
        <p className={styles.message}>{"successMessage"}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Exchange;
