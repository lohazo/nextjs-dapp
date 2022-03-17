import { useMemo } from "react"
import {
  getErc20Contract,
  getErc721Contract,
} from "../lib/contract-accessor"
import useActiveWeb3React from "./useWeb3"

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(
    () => getErc20Contract(address, library.getSigner()),
    [address, library],
  )
}

export const useERC721 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(
    () => getErc721Contract(address, library?.getSigner()),
    [address, library],
  )
}
