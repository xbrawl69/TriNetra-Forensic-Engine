import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TriNetra Forensics | Multi-Vendor DVR/NVR Forensic Analysis Tool",
  description:
    "Vendor-agnostic, cryptographically secure platform for acquisition, recovery, normalization, and ML analysis of surveillance footage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#fafafa] text-[#09090b] font-sans antialiased selection:bg-[#2563eb] selection:text-white">
        {children}
      </body>
    </html>
  );
}
