import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chandan Vishwakarma | Full Stack Developer & Technical Project Manager",
  description:
    "Portfolio of Chandan Vishwakarma — Full Stack Developer with 5 years of experience in React, Next.js, Node.js, Blockchain, and AWS. Currently Technical Project Manager at QuadbTech.",
  keywords: [
    "Chandan Vishwakarma", "Full Stack Developer", "React Developer", "Next.js",
    "Node.js", "Blockchain Developer", "Technical Project Manager", "QuadbTech",
    "Varanasi", "India", "Web Developer Portfolio",
  ],
  authors: [{ name: "Chandan Vishwakarma", url: "https://cpdevs.com" }],
  creator: "Chandan Vishwakarma",
  openGraph: {
    type: "website",
    url: "https://cpdevs.com",
    title: "Chandan Vishwakarma | Full Stack Developer",
    description: "5 years of experience building scalable web apps, leading teams, and shipping blockchain solutions.",
    siteName: "Chandan Vishwakarma Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Chandan Vishwakarma Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan Vishwakarma | Full Stack Developer",
    description: "5 years of experience in React, Next.js, Node.js, Blockchain & AWS.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://cpdevs.com"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaCode.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
