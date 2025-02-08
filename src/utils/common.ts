import { clsx, type ClassValue } from "clsx";
import { formatEther } from "ethers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Make address of wallet shorter
export function shortenAddress(address: `0x${string}` | undefined, chars = 4) {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// Display balance of wallet
export function formatBalance(value: bigint): string {
  return formatEther(value).slice(0, -15);
}

export async function getEthUsdValue(value: bigint) {
  try {
    const ethAmount = Number(formatEther(value));
    if (!ethAmount) return { ethAmount: "0", ethPrice: "0", usdValue: "0" };

    // Fetch current ETH price from CoinGecko API (free, no API key needed)
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    const ethPrice = data.ethereum.usd;

    // Calculate USD value
    const usdValue = ethAmount * ethPrice;

    return {
      ethAmount: ethAmount.toFixed(4),
      ethPrice: ethPrice.toFixed(2),
      usdValue: usdValue.toFixed(2),
    };
  } catch (error) {
    console.error("Failed to fetch ETH price: " + error);
    return { ethAmount: "0", ethPrice: "0", usdValue: "0" };
  }
}
