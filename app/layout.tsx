import type { Metadata } from "next";
import "@/public/styles/globals.css";

export const metadata: Metadata = {
  title: "Messaging App",
  description: "Messaging App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
