import { Alchemy, Network } from "alchemy-sdk";
import { formatEther, parseEther } from "ethers";

const settings = {
  apiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
    "Stz-Sv8gp4xymJo03Pl9z_o73nBtSEkB",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export type EthToUsd = {
  ethAmount: string;
  ethPrice: string;
  usdValue: string;
};

export const fetchEthPrice = async (amount: string): Promise<EthToUsd> => {
  const ethAmount = Number(formatEther(parseEther(amount || "0")));

  if (!ethAmount) {
    return { ethAmount: "0", ethPrice: "0", usdValue: "0" };
  }

  const ethPriceResponse = await alchemy.prices.getTokenPriceBySymbol(["ETH"]);

  if (!ethPriceResponse?.data?.length) {
    throw new Error("Failed to fetch ETH price");
  }

  const usdValue = ethAmount * Number(ethPriceResponse.data[0].prices[0].value);

  return {
    ethAmount: ethAmount.toFixed(4),
    ethPrice: Number(ethPriceResponse.data[0].prices[0].value).toFixed(2),
    usdValue: usdValue.toFixed(2),
  };
};
