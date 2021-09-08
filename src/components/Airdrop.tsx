import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAirdropContractWithSigner,
  isAddress,
} from "../lib/contract-accessor";
import {
  MerkleDistributorInfo,
  parseBalanceMap,
} from "../lib/merkle-tree/parse-balance-map";

function Airdrop(props) {
  const context = useWeb3React<Web3Provider>();

  const [airDropList, setAirDropList] = useState<MerkleDistributorInfo>();

  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAirdropData() {
    const req = await fetch("/airdrop.json", { method: "GET" });
    const data = await req.json();
    if (req.ok && data) {
      setAirDropList(parseBalanceMap(data));
    }
  }

  useEffect(() => {
    fetchAirdropData();
  }, []);

  useEffect(() => {
    if (address && isAddress(address)) {
      const connectedUserData = airDropList?.claims[address];
      if (connectedUserData) {
        setUserData(connectedUserData);
      } else {
        toast.error(
          `No airdrop for user ${address.substring(0, 6)}...${address.substring(
            address.length - 4,
          )}`,
        );
      }
    }
  }, [address]);

  const handleClaimAirdrop = async () => {
    setIsLoading(true);
    const airdropContract = getAirdropContractWithSigner(
      process.env.NEXT_PUBLIC_AIRDROP_ADDRESS,
      context.account,
      context.library,
    );

    const userData = airDropList.claims[address];

    if (userData) {
      const { index, amount, proof } = userData;
      const tx = await airdropContract.claim(index, address, amount, proof);
      await toast.promise(tx.wait(), {
        loading: "Processing...",
        success: "Claim airdrop success!",
        error: "Claim airdrop error please try again!",
      });
      setIsLoading(false);
      // setUserData(null);
    } else {
      toast.error(
        `No airdrop for user ${address.substring(0, 6)}...${address.substring(
          address.length - 4,
        )}`,
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto relative pb-10">
      <div className="mt-4">
        <div className="bg-mainColor rounded-t-2xl py-2 text-center">
          <p className="text-white">Airdrop</p>
        </div>
        <div className="bg-white rounded-b-2xl shadow-md px-4 py-6 ">
          <p className="text-mainColor text-center">
            Input your address to trigger BTCN reward from
          </p>
          <p className="text-mainColor text-center">
            <span className="font-semibold">Airdrop Campaign</span>. If this
            address is <span className="font-semibold">on eligible list</span>,
            BTCN will be sent to it by smart contract
          </p>

          <div>
            <p className="text-sm text-gray-light mt-6">Enter wallet address</p>
            <div className="border-gray-light px-2 py-2 border rounded w-full mt-1">
              <input
                type="text"
                className="focus:outline-none w-full"
                placeholder="Wallet address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                // readOnly
              />
            </div>
          </div>

          <button
            className="btn-primary mt-4"
            disabled={isLoading || !address || !userData}
            onClick={handleClaimAirdrop}
          >
            Claim{" "}
            {/* <span className="text-xs">
              {userData &&
                new BigNumber(userData.amount).div(1e18).toFixed(2) + "XPO"}
            </span> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Airdrop;
