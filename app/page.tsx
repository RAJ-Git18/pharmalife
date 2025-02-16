import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import { Slider } from "@/components/ui/carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-32">
      <div className="slider">
        <Slider />
      </div>

      <div className="products-features">
        <Card/>
      </div>
    </div>
  )
}
