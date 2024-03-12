import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider"
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body className="container bg-gradient-to-b from-green-800 from-15%% to-slate-200 mx-auto h-screen w-screen">
    <SessionAuthProvider>
      <Navbar />
      <main className="relative">
        <div className="mt-20">
          {children}
        </div>
      </main>
    </SessionAuthProvider>
  </body>
</html>

  );
}
