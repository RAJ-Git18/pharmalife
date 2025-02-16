import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import { Slider } from "@/components/ui/carousel";
import Image from "next/image";

const card_images = [
  "images/slider/medicine2.png",
  "images/slider/medicine2.png",
  "images/slider/medicine2.png",
  "images/slider/medicine2.png",
]


export default function Home() {
  return (
    <div className="mx-32 ">
      <div className="slider">
        <Slider />
      </div>

      <div className="cards mt-20 ">
        <h1 className="md:text-5xl font-semibold text-2xl text-center">Latest Products</h1>
        <div className="flex flex-wrap justify-evenly">
          {
            card_images.map((value, index) => (
              <ul key={index} className="products-features flex  ">
                <li><Card /></li>
              </ul>
            ))
          }
        </div>

      </div>

    </div>
  )
}
