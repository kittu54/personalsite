import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darshil Patel — CS × Economics",
  description:
    "Darshil Patel — CS + Economics at University of Kansas. ML, systems engineering, econometrics, and rigorous building.",
  openGraph: {
    title: "Darshil Patel — CS × Economics",
    description:
      "ML, systems engineering, econometrics, and rigorous building.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body
        className="antialiased"
        style={{ backgroundColor: "#09090b", color: "#b8b8be" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
