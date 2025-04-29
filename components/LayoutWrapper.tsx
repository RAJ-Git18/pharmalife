"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "@/context/CardContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/adminsite");

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {!isAdmin && <Navbar />}
        <main className={`flex-1 ${isAdmin ? "" : "px-4 md:px-10 py-4"}`}>
          {children}
        </main>
        {!isAdmin && <Footer />}
      </div>
    </CartProvider>
  );
}

