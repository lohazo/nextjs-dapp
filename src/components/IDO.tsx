import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import AmountInputMulti from "./AmountInputMulti";

const tokens = [
  { symbol: "BNB", needApproval: false },
  { symbol: "BUSD", needApproval: true },
  { symbol: "USDT", needApproval: true },
];

function IDO() {
  const context = useWeb3React<Web3Provider>();

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
    <div className="pb-6 px-4 md:px-0">
      <div className="max-w-sm mx-auto relative mt-10 bg-white p-8 rounded-2xl border-1">
        <AmountInputMulti
          tokenSymbol="BNB"
          balance={userBnbBalance}
          value={amount}
          onChange={handleAmountChange}
          onSelectToken={handleSelectToken}
        />

        <div className="flex my-6 justify-center">
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
              className="btn-primary bg-green-500"
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
