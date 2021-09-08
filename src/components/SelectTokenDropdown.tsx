import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import IconCarretDown from "./icons/IconCarretDown";

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

function SelectTokenDropdown({ onSelectToken, ...props }) {
  const node = useRef();
  const [isOpen, toggleOpen] = useState(false);
  const toggleOpenMenu = () => {
    toggleOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    // @ts-ignore
    if (node.current && node.current?.contains(e.target)) {
      return;
    }
    toggleOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [selectedToken, setSelectedToken] = useState("BNB");

  const handleSelectToken = (token: string) => {
    setSelectedToken(token);
    onSelectToken(token);
    toggleOpen(false);
  };

  return (
    <div ref={node} className="relative">
      <motion.div>
        <div onClick={toggleOpenMenu} className="cursor-pointer">
          <div className="flex items-center hover:opacity-70">
            <img
              src={`/images/tokens/${selectedToken}.svg`}
              style={{ width: 24, height: 24 }}
              alt="token"
            />
            <p className="ml-2 text-white font-bold">{selectedToken}</p>
            <IconCarretDown />
          </div>
        </div>

        <motion.div
          initial="exit"
          animate={isOpen ? "enter" : "exit"}
          variants={subMenuAnimate}
          style={{
            position: "absolute",
            top: 44,
            right: 0,
            borderRadius: 5,
            transformOrigin: "50% -30px",
            zIndex: 20,
            boxShadow: "inset 0px -2px 4px #02253F",
            backgroundColor: "rgba(221, 243, 255, 0.3)",
            width: 120,
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <div className="flex flex-col">
            <Item onClick={() => handleSelectToken("BNB")} tokenSymbol="BNB" />
            <Item
              onClick={() => handleSelectToken("BUSD")}
              tokenSymbol="BUSD"
            />
            <Item
              onClick={() => handleSelectToken("USDT")}
              tokenSymbol="USDT"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SelectTokenDropdown;

function Item({ tokenSymbol, ...props }) {
  return (
    <div className="flex items-center cursor-pointer py-2 px-4" {...props}>
      <img
        src={`/images/tokens/${tokenSymbol}.svg`}
        style={{ width: 24, height: 24 }}
      />
      <p className="ml-2 text-white font-bold">{tokenSymbol}</p>
    </div>
  );
}
