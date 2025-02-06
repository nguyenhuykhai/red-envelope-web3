import logo from "../../public/logo2.png";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia, kairos } from "wagmi/chains";

export const projectId = "0bf2f72586a82f5184968f3ac8d7f1d0";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web 3.0 Lì Xì Trực Tuyến",
  description:
    "Website cho phép người dùng tạo và nhận Lì Xì trực tuyến thông qua các nhiệm vụ, sự kiện đặc biệt, hoặc gửi trực tiếp cho người thân, bạn bè. Ứng dụng sử dụng công nghệ Blockchain để đảm bảo tính minh bạch, bảo mật. Người dùng có thể tham gia vào các sự kiện lì xì hoặc tự tạo phong bao lì xì để gửi cho người khác.",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: [logo.src],
};

// Create wagmiConfig
const chains = [mainnet, sepolia, kairos] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
