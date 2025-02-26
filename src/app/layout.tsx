

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../../src/components/Header/header";
import "./globals.css";
import SideNav from "@/components/Sidenav/sidenav";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { ReduxProvider } from "@/providers/ReduxProvider";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Squareme Finance",
  description: "We cater for your financial needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-background font-sans">
        <ReduxProvider>
          <HeaderProvider>
            <div>
              <Header />
              <main className="flex">
                <SideNav />
                {children}
              </main>
            </div>
          </HeaderProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
