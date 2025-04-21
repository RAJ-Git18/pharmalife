"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/adminsite");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className={`flex-1 ${isAdmin ? "" : "px-4 md:px-10 py-4"}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}