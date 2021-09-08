import React from "react";

function AmountInput({
  label = "From",
  balance = "",
  placeholder = "0",
  tokenSymbol,
  ...props
}) {
  return (
    <div
      className="rounded-2xl px-4 py-4"
      style={{
        boxShadow: "rgb(74 74 104 / 10%) 0px 2px 2px -1px inset",
        backgroundColor: "rgb(238, 234, 244)",
      }}
    >
      <label htmlFor="amount" className="flex justify-between text-sm text-inputText">
        <p>{label}</p>
        {balance && <p>Balance: {balance}</p>}
      </label>

      <label htmlFor="amount" className="flex justify-between mt-2 w-full">
        <input
          id="amount"
          // type="number"
          placeholder={placeholder}
          {...props}
          className="bg-transparent text-inputText w-[75%] outline-none font-bold placeholder-inputText"
          style={{ fontSize: 20 }}
        />

        <div className="flex items-center">
          <img
            src={`/images/tokens/${tokenSymbol}.svg`}
            style={{ width: 24, height: 24 }}
            alt="token"
          />
          <p className="ml-2 text-inputText font-bold">{tokenSymbol}</p>
        </div>
      </label>
    </div>
  );
}

export default AmountInput;
