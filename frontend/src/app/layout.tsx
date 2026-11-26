import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { DarkModeProvider } from "../context/DarkModeContext";
import CookieConsent from "../components/CookieConsent";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "RYSE WEARS — Style that speaks for you",
    template: "%s | RYSE WEARS",
  },
  description: "Discover versatile pieces, thoughtful details and fresh ways to make every look your own at RYSE WEARS.",
  applicationName: "RYSE WEARS",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.variable + " " + montserrat.variable + " antialiased"}>
        <DarkModeProvider>
          <CartProvider>
            <div className="relative z-10">{children}</div>
            <CookieConsent />
          </CartProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
