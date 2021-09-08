import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DialogOverlay } from "@reach/dialog";
import { MotionDialogContent } from "./MotionDialogContent";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "../hooks";
import { injected } from "../lib/connectors";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import IconCloseDialog from "./icons/IconCloseDialog";

enum ConnectorNames {
  Injected = "Browser Wallet",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
};

function getWalletServiceIcon(name: string) {
  switch (name) {
    case ConnectorNames.Injected:
      return "/images/wallets/browser-wallet.png";
  }
}

export const ConnectWalletModalContext = React.createContext({ isOpen: false });

function ModalConnectWallet({ label, ...props }) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div>
      <p className="" onClick={open}>
        {label}
      </p>

      <AnimatePresence>
        {showDialog && (
          <DialogOverlay onDismiss={close}>
            {/* @ts-ignore */}
            <MotionDialogContent
              aria-label="Connect wallet modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl"
              style={{ width: 350 }}
            >
              <motion.div
                className="flex flex-col"
                initial={{ y: +30 }}
                animate={{ y: 0 }}
              >
                <div>
                  <div className="flex justify-between items-center py-6 px-8 bg-background rounded-t-2xl">
                    <p className="text-center text-xl font-bold">
                      Connect your wallet
                    </p>
                    <IconCloseDialog
                      onClick={close}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="grid gap-3 px-8 my-8">
                    {Object.keys(connectorsByName).map((name) => {
                      const currentConnector = connectorsByName[name];
                      const activating =
                        currentConnector === activatingConnector;
                      const connected = currentConnector === connector;
                      const disabled =
                        // !triedEager ||
                        !!activatingConnector || connected || !!error;

                      return (
                        <button
                          className="bg-gray-light rounded hover:shadow-md duration-300 border-2 py-4"
                          style={{
                            borderColor: activating
                              ? "orange"
                              : connected
                              ? "green"
                              : "rgba(209, 213, 219",
                            cursor: disabled ? "unset" : "pointer",
                            position: "relative",
                            opacity:
                              (!connected && disabled) || activating
                                ? "0.5"
                                : 1,
                          }}
                          disabled={disabled}
                          key={name}
                          onClick={() => {
                            setActivatingConnector(currentConnector);
                            activate(connectorsByName[name]);
                            localStorage.setItem("isDeactivated", "2");
                          }}
                        >
                          <div className="flex items-center justify-between px-4">
                            <div className="font-semibold text-blue-dark">
                              {name}
                            </div>
                            <div
                              style={{ width: 24, height: 24, display: "flex" }}
                            >
                              <img
                                src={getWalletServiceIcon(name)}
                                alt={name}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col items-center px-8">
                    {(active || error) && (
                      <button
                        className="btn-primary w-full px-4 py-2 font-bold text-white rounded-xl"
                        style={{
                          backgroundColor: "rgb(122, 110, 170)",
                        }}
                        onClick={() => {
                          const isDeactivated = localStorage.getItem(
                            "isDeactivated",
                          );
                          if (!isDeactivated) {
                            localStorage.setItem("isDeactivated", "1");
                          } else if (isDeactivated == "2") {
                            localStorage.setItem("isDeactivated", "1");
                          }
                          deactivate();
                          // client.resetStore();
                        }}
                      >
                        Deactivate
                      </button>
                    )}

                    {!!error && (
                      <h4 className="mt-4 mb-8">{getErrorMessage(error)}</h4>
                    )}
                  </div>
                </div>
              </motion.div>
            </MotionDialogContent>
          </DialogOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModalConnectWallet;

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}
