import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlyWP - WordPress Management Suite",
  description:
    "Complete WordPress management panel and daemon. Control, configure, and manage WordPress installations at scale with PlyWP's powerful tools.",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "PlyWP - WordPress Management Suite",
    description:
      "Complete WordPress management panel and daemon for developers and hosting operators.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlyWP - WordPress Management Suite",
    description:
      "Complete WordPress management panel and daemon for developers and hosting operators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
