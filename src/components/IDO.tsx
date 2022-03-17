import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { useERC20 } from "../hooks/useContract";
import AmountInput from "./AmountInput";
import AmountInputMulti from "./AmountInputMulti";

const tokens = [
  { symbol: "BNB", needApproval: false },
  { symbol: "BUSD", needApproval: true },
  { symbol: "USDT", needApproval: true },
];

function IDO() {
  const context = useWeb3React<Web3Provider>();
  const busdContract = useERC20("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

  const [userBnbBalance, setUserBnbBalance] = useState("0");
  const [soldAmount, setsoldAmount] = useState("");
  const [refAddress, setRefAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [isApproved, setIsApproved] = useState(false);

  const handleSelectToken = (token) => {
    const selected = tokens.find((i) => i.symbol === token);
    // @ts-ignore
    setSelectedToken(selected);
  };

  const getBalance = async () => {
    const balance = await busdContract.balanceOf(context.account);
    setUserBnbBalance(balance.toString());
  };

  useEffect(() => {
    if (context.account && busdContract) {
      getBalance();
    }
  }, [selectedToken, context.account, busdContract]);

  const [amount, setAmount] = useState("");

  const handleAmountChange = (e: any) => {
    const val = e.target.value;
    // if (!Number(val) && val != "" && val != '0') return;
    if (new BigNumber(val).gt(userBnbBalance)) {
      setAmount(userBnbBalance);
    } else {
      setAmount(val);
    }
  };

  const handleBuyIdo = async () => {};

  const handleApprove = async () => {};

  return (
    <div className="px-4 pb-6 md:px-0">
      <div className="relative max-w-sm p-8 mx-auto mt-10 bg-white rounded-2xl border-1">
        <AmountInputMulti
          tokenSymbol="BNB"
          balance={userBnbBalance}
          value={amount}
          onChange={handleAmountChange}
          onSelectToken={handleSelectToken}
        />

        <div className="flex justify-center my-6">
          <img src="/images/arrowdown.svg" />
        </div>

        <AmountInput
          tokenSymbol="BNB"
          label="To"
          // readOnly={true}
          value={soldAmount === "NaN" ? "0" : soldAmount}
        />

        <div
          className={`grid grid-cols-${
            selectedToken?.symbol === "BNB" ? 1 : 2
          } gap-4 justify-center mt-8`}
        >
          {selectedToken?.symbol !== "BNB" && !isApproved && (
            <button
              className="bg-green-500 btn-primary"
              onClick={handleApprove}
            >
              Approve
            </button>
          )}
          <button
            disabled={
              !refAddress ||
              // availableToken == "0" ||
              (selectedToken?.symbol !== "BNB" && !isApproved)
            }
            className="btn-primary"
            onClick={handleBuyIdo}
          >
            BUY POCO
          </button>
        </div>
      </div>
    </div>
  );
}

export default IDO;
