"use client";
import { formatBalance } from "@/lib/utils";
import { formatEther } from "ethers";
import React, { useEffect, useState } from "react";

interface EthConverterProps {
  value: bigint;
  symbol?: string;
}

interface PriceData {
  ethAmount: string;
  ethPrice: string;
  usdValue: string;
}

const EthConverter: React.FC<EthConverterProps> = ({ value, symbol }) => {
  const [ethToUsd, setEthToUsd] = useState<PriceData>({
    ethAmount: "0",
    ethPrice: "0",
    usdValue: "0",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        setLoading(true);
        setError(null);

        const ethAmount = Number(formatEther(value));
        if (!ethAmount) {
          setEthToUsd({ ethAmount: "0", ethPrice: "0", usdValue: "0" });
          return;
        }

        // Fetch current ETH price from CoinGecko API
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const ethPrice = data.ethereum.usd;

        // Calculate USD value
        const usdValue = ethAmount * ethPrice;

        setEthToUsd({
          ethAmount: ethAmount.toFixed(4),
          ethPrice: ethPrice.toFixed(2),
          usdValue: usdValue.toFixed(2),
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Failed to fetch ETH price:", errorMessage);
        setError(errorMessage);
        setEthToUsd({ ethAmount: "0", ethPrice: "0", usdValue: "0" });
      } finally {
        setLoading(false);
      }
    };

    fetchEthPrice();
  }, [value]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-center space-y-4">
      <div className="space-y-1">
        <p className="text-white text-4xl font-semibold">
          $
          {Number(ethToUsd.usdValue).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <p className="text-white text-2xl font-regular italic">
          {formatBalance(value)} {symbol}
        </p>
      </div>
    </div>
  );
};

export default EthConverter;
