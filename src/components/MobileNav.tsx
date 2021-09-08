import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import IconHamberger from "./icons/IconHamberger";
import ModalConnectWallet from "./ModalConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function MobileNav() {
  const node = useRef();
  const [isHover, toggleHover] = useState(false);

  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const handleClickOutside = (e) => {
    // @ts-ignore
    if (node.current && node.current?.contains(e.target)) {
      return;
    }
    toggleHover(false);
  };

  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { account } = context;

  useEffect(() => {
    if (isHover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHover]);

  const sidebar = {
    open: (height = 1000) => ({
      pointerEvents: "all",
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      zIndex: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      pointerEvents: "none",
      clipPath: "circle(0px at 0px 0px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <div ref={node} className="relative">
      <motion.div onClick={toggleHoverMenu} className="w-full">
        <IconHamberger onClick={toggleHoverMenu} />
        <motion.div
          initial={false}
          animate={isHover ? "open" : "closed"}
          // @ts-ignore
          variants={sidebar}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            backgroundColor: "#150224",
            transformOrigin: "50% -30px",
            zIndex: 2,
            height: "100vh",
            width: 240,
            overflowY: "auto",
          }}
        >
          <motion.div variants={variants} className="mt-4">
            <>
              <div className="flex w-full justify-center items-center mb-10">
                <div className="px-2 w-4/5 text-center btn-primary py-2 ">
                  <ModalConnectWallet
                    label={
                      account
                        ? `${account.substring(0, 6)}...${account.substring(
                            account.length - 4,
                          )}`
                        : "Connect"
                    }
                  />
                </div>
              </div>
            </>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MobileNav;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function MobileMenuItem(props) {
  const router = useRouter();
  const isActive = router.pathname === props.href;
  return (
    <motion.div
      variants={variants}
      // whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={props.href || "/"}
        // style={{ color: "inherit", textDecoration: "none" }}
      >
        <div
          className={`items-center px-3 py-4 text-sm flex cursor-pointer hover:bg-white hover:bg-opacity-5 ${
            isActive
              ? "text-gray-light border-l-2 border-yellow bg-white bg-opacity-10"
              : "text-gray"
          }`}
        >
          {props.icon}
          <p className="ml-3 text-white">{props.label}</p>
        </div>
      </Link>
    </motion.div>
  );
}
