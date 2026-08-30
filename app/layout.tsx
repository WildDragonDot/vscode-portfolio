import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chandan Vishwakarma | Technical Project Manager & Full Stack Developer",
  description:
    "Portfolio of Chandan Vishwakarma — Technical Project Manager & Full Stack Developer with ~6 years of experience in React, Next.js, Node.js, Blockchain (ICP/Motoko), and AWS. Delivered 58+ production projects.",
  keywords: [
    "Chandan Vishwakarma", "Full Stack Developer", "React Developer", "Next.js Developer",
    "Node.js Developer", "Blockchain Developer", "Internet Computer", "ICP", "Motoko",
    "Technical Project Manager", "QuadbTech", "Varanasi", "India", "VS Code Portfolio",
  ],
  authors: [{ name: "Chandan Vishwakarma", url: "https://chandandev.online" }],
  creator: "Chandan Vishwakarma",
  openGraph: {
    type: "website",
    url: "https://chandandev.online",
    title: "Chandan Vishwakarma | Full Stack Developer & Technical Project Manager",
    description: "6 years building scalable web apps, leading engineering teams, and shipping blockchain solutions.",
    siteName: "Chandan Vishwakarma Portfolio",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Chandan Vishwakarma Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan Vishwakarma | Technical Project Manager & Full Stack Dev",
    description: "6 years of experience in React, Next.js, Node.js, Blockchain & AWS.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://chandandev.online"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaCode.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
