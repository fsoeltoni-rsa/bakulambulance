import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Bakul Ambulance - Spesialis Pembuatan Ambulance",
    template: "%s | Bakul Ambulance",
  },
  description: "Karoseri Ambulance Terpercaya untuk Pelayanan Medis Terbaik. Dipercaya rumah sakit, puskesmas, dan instansi pemerintah di seluruh Indonesia.",
  openGraph: {
    title: "Bakul Ambulance - Spesialis Pembuatan Ambulance",
    description: "Karoseri Ambulance Terpercaya untuk Pelayanan Medis Terbaik.",
    url: "https://bakulambulance.com",
    siteName: "Bakul Ambulance",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bakul Ambulance",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
