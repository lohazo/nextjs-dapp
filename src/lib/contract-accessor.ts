import { ethers } from "ethers";
import { Erc721__factory, Erc20__factory } from "../../types";
import { simpleRpcProvider } from "./providers"
// import UncheckedJsonRpcSigner from "./signer"

export function getErc20Contract(
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) {
  const signerOrProvider = signer ?? simpleRpcProvider
  return Erc20__factory.connect(address, signerOrProvider)
}

export function getErc721Contract(
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider,
) {
  const signerOrProvider = signer ?? simpleRpcProvider
  return Erc721__factory.connect(address, signerOrProvider)
}
