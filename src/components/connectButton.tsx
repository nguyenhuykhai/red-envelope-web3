import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const ConnectButton = () => {
  // 4. Use modal hook
  const { open } = useWeb3Modal();
  return (
    <>
      <Button
        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
        onClick={() => open()}
      >
        Open Connect Modal
      </Button>
      <Button
        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
        onClick={() => open({ view: "Networks" })}
      >
        Open Network Modal
      </Button>
    </>
  );
};

export default ConnectButton;
