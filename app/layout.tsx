import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimationProvider } from "@/context/AnimationContext";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pebbling AI",
  description: "The Esperanto for agent-to-agent communication",
  icons: {
    icon: "/Pebbling.jpg",
    apple: "/Pebbling.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} font-sans h-full`}
    >
      <body className={"dark bg-background text-foreground h-full"}>
        <ClerkProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
