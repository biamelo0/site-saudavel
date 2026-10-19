import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunneen Alimentos Saudáveis",
  description: "Comida saudável e ingredientes frescos 100% sem transgênicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
