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
  title: "RYSE Wears - Fashion E-commerce",
  description: "Discover the latest fashion trends at RYSE Wears. Shop our exclusive collection of clothing and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${montserrat.variable} antialiased`}
      >
        <DarkModeProvider>
          <CartProvider>
            {children}
            <CookieConsent />
          </CartProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
