import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anti-Fluff Investor — Raw Financial Truth",
  description:
    "Strip away analyst hype and AI-generated fluff. See the brutal financial reality behind public company narratives.",
  keywords: ["stock analysis", "financial truth", "anti-hype", "raw data", "P/E ratio", "insider trading"],
  openGraph: {
    title: "Anti-Fluff Investor",
    description: "Raw financial truth. No spin.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-obsidian text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
