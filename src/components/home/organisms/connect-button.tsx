import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

const ConnectButton = () => {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  return (
    <>
      {address ? (
        <Button
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
          onClick={() => disconnect()}
        >
          Ngắt kết nối
        </Button>
      ) : (
        <Button
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
          onClick={() => open({ view: "Networks" })}
        >
          Kết nối ví ETH của bạn
        </Button>
      )}
    </>
  );
};

export default ConnectButton;
