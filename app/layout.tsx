import type { Metadata } from "next";
import "./globals.css";
import "./satoshi.css";
import { AnimationProvider } from "@/context/AnimationContext";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "@/components/PostHogProvider";

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
    <html lang="en" className="font-sans h-full">
      <body className="dark bg-background text-foreground h-full">
        <PostHogProvider>
          <ClerkProvider>
            <AnimationProvider>{children}</AnimationProvider>
          </ClerkProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
