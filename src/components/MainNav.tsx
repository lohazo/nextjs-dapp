import Link from "next/link";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import ModalConnectWallet from "./ModalConnectWallet";

function MainNav() {
  const context = useWeb3React<Web3Provider>();
  const { account } = context;

  return (
    <div className="flex justify-between px-5 items-center relative py-3 border-b-2 bg-white">
      <Link href="/">
        <div className="cursor-pointer py-4 md:py-0">
          <p className="text-xl font-bold">Nextjs dapp</p>
        </div>
      </Link>

      <div className="md:flex items-center">
        <button className="px-4 py-1 bg-primary rounded-full font-bold text-white">
          <p>
            <ModalConnectWallet
              label={
                account
                  ? `${account.substring(0, 6)}...${account.substring(
                      account.length - 4,
                    )}`
                  : "Connect"
              }
            />
          </p>
        </button>
      </div>

      {/* <div className="flex items-center md:hidden">
        <div className="md:hidden ml-3">
          <MobileNav />
        </div>
      </div> */}
    </div>
  );
}

export default MainNav;

function Item({ children, href }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href || "/"}>
      <div
        className={`${
          !isActive ? "border-transparent" : "border-yellow"
        } border-b-2 flex mx-5 py-4`}
      >
        <p
          className={`${
            !isActive ? "text-gray-300" : "text-white font-bold"
          } cursor-pointer`}
        >
          {children}
        </p>
      </div>
    </Link>
  );
}
