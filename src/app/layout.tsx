import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Modern sans-serif font
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HealthScope | AI Lab",
  description: "Advanced Blood Data Analysis System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans flex antialiased`}>
        {/* Arka plan Radial Gradient efekti */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
        
        <Sidebar />
        
        <main className="flex-1 min-h-screen">
          {/* Main content background gradient */}
          <div className="absolute inset-0 -z-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(56,189,248,0.07)_0,rgba(3,7,18,0)_100%)]"></div>
          
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}