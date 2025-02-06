import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  subsets: ["vietnamese"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Web 3.0 Lì Xì Trực Tuyến",
  description:
    "Website cho phép người dùng tạo và nhận Lì Xì trực tuyến thông qua các nhiệm vụ, sự kiện đặc biệt, hoặc gửi trực tiếp cho người thân, bạn bè. Ứng dụng sử dụng công nghệ Blockchain để đảm bảo tính minh bạch, bảo mật. Người dùng có thể tham gia vào các sự kiện lì xì hoặc tự tạo phong bao lì xì để gửi cho người khác.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
