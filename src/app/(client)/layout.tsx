import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dharani Dharan — UI/UX Designer & Web Developer",
  description: "Dharani Dharan is a UI/UX Designer and Web Developer creating intuitive digital experiences, interfaces and products for web and mobile.",
  openGraph: {
    title: "Dharani Dharan — UI/UX Designer & Web Developer",
    description: "Dharani Dharan is a UI/UX Designer and Web Developer creating intuitive digital experiences, interfaces and products for web and mobile.",
    url: "https://dharanidharan-lac.vercel.app",
    siteName: "Dharani Dharan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharani Dharan — UI/UX Designer & Web Developer",
    description: "Dharani Dharan is a UI/UX Designer and Web Developer creating intuitive digital experiences, interfaces and products for web and mobile.",
  },
  alternates: {
    canonical: "https://dharanidharan-lac.vercel.app",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
