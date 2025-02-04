import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { favicon } from "@/assets/image";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

export const metadata: Metadata = {
  title: "Web 3.0 Lì Xì Trực Tuyến",
  description:
    "Website cho phép người dùng tạo và nhận Lì Xì trực tuyến thông qua các nhiệm vụ, sự kiện đặc biệt, hoặc gửi trực tiếp cho người thân, bạn bè. Ứng dụng sử dụng công nghệ Blockchain để đảm bảo tính minh bạch, bảo mật. Người dùng có thể tham gia vào các sự kiện lì xì hoặc tự tạo phong bao lì xì để gửi cho người khác.",
  icons: {
    icon: favicon.src,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get("cookie")
  );
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
