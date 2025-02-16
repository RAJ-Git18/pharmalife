import Navbar from "@/components/Navbar";
import { Slider } from "@/components/ui/carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-32">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="slider">
        <Slider />
      </div>
    </div>
  )
}
