import type { Metadata } from "next";
import "./globals.css"
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "PharmaLife",
  description: "Here to serve the medicines",
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
