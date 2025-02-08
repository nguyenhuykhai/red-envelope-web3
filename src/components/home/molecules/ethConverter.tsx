"use client";
import { formatBalance } from "@/utils/common";
import { formatEther } from "ethers";
import React, { useEffect, useState, useCallback } from "react";
import { Network, Alchemy, GetTokenPriceBySymbolResponse } from "alchemy-sdk";

const settings = {
  apiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
    "Stz-Sv8gp4xymJo03Pl9z_o73nBtSEkB",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

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

  const fetchEthPrice = useCallback(async () => {
    try {
      const ethAmount = Number(formatEther(value));
      if (!ethAmount) {
        setEthToUsd({ ethAmount: "0", ethPrice: "0", usdValue: "0" });
        return;
      }

      const ethPriceResponse: GetTokenPriceBySymbolResponse =
        await alchemy.prices.getTokenPriceBySymbol(["ETH"]);

      if (
        !ethPriceResponse ||
        !ethPriceResponse.data ||
        !ethPriceResponse.data.length
      ) {
        throw new Error("Failed to fetch ETH price");
      }

      const usdValue =
        ethAmount * Number(ethPriceResponse.data[0].prices[0].value);

      setEthToUsd({
        ethAmount: ethAmount.toFixed(4),
        ethPrice: Number(ethPriceResponse.data[0].prices[0].value).toFixed(2),
        usdValue: usdValue.toFixed(2),
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch ETH price";
      console.error("Error fetching ETH price:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [value]);

  useEffect(() => {
    // Initial fetch
    fetchEthPrice();

    // Set up interval for real-time updates (every 10 seconds)
    const intervalId = setInterval(fetchEthPrice, 10000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [fetchEthPrice]);

  if (loading && ethToUsd.usdValue === "0") {
    return (
      <div className="text-center space-y-4">
        <div className="animate-pulse bg-gray-200 h-10 w-32 mx-auto rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Unable to fetch price. Please try again later.
      </div>
    );
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
