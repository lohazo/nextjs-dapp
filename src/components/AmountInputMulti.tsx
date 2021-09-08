import React from "react";
import IconCarretDown from "./icons/IconCarretDown";
import SelectTokenDropdown from "./SelectTokenDropdown";

function AmountInputMulti({
  label = "From",
  balance = "",
  placeholder = "0",
  tokenSymbol,
  onSelectToken,
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
      <label htmlFor="amount" className="flex justify-between text-inputText text-sm">
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

        <SelectTokenDropdown onSelectToken={onSelectToken} />
      </label>
    </div>
  );
}

export default AmountInputMulti;
