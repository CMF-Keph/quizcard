import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css"
import Navbar from "./shared/Navbar";
import Popup from "./shared/Popup";
import PopupProvider from "./provider/PopupProvider";

const font = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700']
});

export const metadata: Metadata = {
  title: "Quizmaster",
  description: "Aprende y se consistente gracias a Deckmaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${font.className} antialiased bg-gray-900 text-gray-100 relative`}
      >
        <PopupProvider>
          <Popup></Popup>
          <Navbar></Navbar>
          <main className="px-4 py-12">
            {children}
          </main>
        </PopupProvider>
      </body>
    </html>
  );
}
