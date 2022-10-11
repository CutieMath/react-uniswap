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
  const { account } = useEthers();
  const [fromValue, setFromValue] = useState("0");
  const [fromToken, setFromToken] = useState(pools[0].token0Address);
  const [toToken, setToToken] = useState("");
  const [resetState, setResetState] = useState(false);

  const fromValueBigNumber = parseUnits(fromValue);
  const availableTokens = getAvailableTokens(pools);
  const counterpartTokens = getCounterpartTokens(pools, fromToken);
  const pairAddress =
    findPoolByTokens(pools, fromToken, toToken)?.address ?? "";
  const routerContract = new Contract(ROUTER_ADDRESS, abis.router02);
  const fromTokenContract = new Contract(fromToken, ERC20.abi);
  const fromTokenBalance = useTokenBalance(fromToken, account);
  const toTokenBalance = useTokenBalance(toToken, account);
  const tokenAllowance =
    useTokenAllowance(fromToken, account, ROUTER_ADDRESS) || parseUnits("0");
  const approvalNeeded = fromValueBigNumber.gt(tokenAllowance);
  const fromValueIsGreaterThan0 = fromValueBigNumber.gt("0");
  const hasEnoughBalance = fromValueBigNumber.lte(
    fromTokenBalance ?? parseUnits("0")
  );

  const { state: swapApproveState, send: swapApproveSend } =
    useContractFunction(fromTokenContract, "approve", {
      transactionName: "onApproveRequested",
      gasLimitBufferPercentage: 10,
    });

  const { state: swapExecuteState, send: swapExecuteSend } =
    useContractFunction(routerContract, "swapExactTokensForTokens", {
      transactionName: "swapExactTokensForTokens",
      gasLimitBufferPercentage: 10,
    });

  const isApproving = isOperationPending(swapApproveState);
  const isSwapping = isOperationPending(swapExecuteState);

  const canApprove = !isApproving && approvalNeeded;
  const canSwap =
    !approvalNeeded &&
    !isSwapping &&
    fromValueIsGreaterThan0 &&
    hasEnoughBalance;

  const successMessage = getSuccessMessage(swapApproveState, swapExecuteState);
  const failureMessage = getFailureMessage(swapApproveState, swapExecuteState);

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
      {"approvalNeeded" && !isSwapping ? (
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
