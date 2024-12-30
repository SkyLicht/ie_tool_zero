import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

const workSans = localFont({
  src: [
    {
      path: "../public/fonts/work-sans/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/work-sans/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/roboto/Roboto-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/Roboto-Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/Roboto-Light.ttf",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});

const mono = localFont({
  src: [
    {
      path: "../public/fonts/roboto-mono/RobotoMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto-mono/RobotoMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto-mono/RobotoMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto-mono/RobotoMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto-mono/RobotoMono-Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto-mono/RobotoMono-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto-mono/RobotoMono-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "IE TOOL Zero",
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${mono.variable} ${workSans.variable} font-roboto antialiased dark bg-licht_background`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
