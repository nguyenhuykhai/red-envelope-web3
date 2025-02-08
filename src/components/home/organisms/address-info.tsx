"use client";
import EthConverter from "@/components/home/molecules/ethConverter";
import { Card } from "@/components/ui/card";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { pixelArt } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { HoverCard } from "@radix-ui/react-hover-card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useBalance, UseBalanceReturnType } from "wagmi";
import { CircleHelp } from "lucide-react";
import { shortenAddress } from "@/utils/common";

export interface UserInfo {
  address: `0x${string}` | undefined;
  avatar: string;
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

const AddressInfo = () => {
  const { address } = useAccount();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const result: UseBalanceReturnType = useBalance({ address });

  useEffect(() => {
    if (address) {
      setUserInfo({
        address,
        avatar: createAvatar(pixelArt, {
          seed: address,
          scale: 80,
          size: 4,
          radius: 10,
          backgroundColor: ["d1d4f9", "c0aede", "d1d4f9"],
        }).toDataUri(),
        decimals: result.data?.decimals ?? 0,
        formatted: result.data?.formatted ?? "",
        symbol: result.data?.symbol ?? "",
        value: result.data?.value ?? BigInt(0),
      });
    } else {
      setUserInfo(undefined);
    }
  }, [address, result.data]);

  if (!userInfo) {
    return (
      <div className="flex items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center flex-1 text-red-800 bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-amber-900">
          Tạo mã lì xì
        </h1>
      </div>
    );
  }

  return (
    <section>
      <Card className="bg-red-600 p-6 mb-4 mx-auto rounded-3xl">
        <div className="flex flex-col items-center space-y-2">
          {/* Profile Image */}
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1">
            <Image
              src={userInfo?.avatar}
              alt={userInfo?.address || "Avatar"}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>

          {/* Address */}
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <p className="text-white text-sm font-semibold">Địa chỉ ví</p>
                <CircleHelp className="h-4 w-4 text-white" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" sideOffset={8}>
              <p className="text-red-800 text-sm text-center font-semibold">
                {shortenAddress(userInfo.address, 10)}
              </p>
            </HoverCardContent>
          </HoverCard>

          {/* Balance Section */}
          <EthConverter value={userInfo.value} symbol={userInfo.symbol} />
        </div>
      </Card>
    </section>
  );
};

export default AddressInfo;
