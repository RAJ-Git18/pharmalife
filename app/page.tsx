import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import { Slider } from "@/components/ui/carousel";
import Image from "next/image";

const card_images : string[] = [
  "/images/slider/medicine.png",
  "/images/products/aniseptic.png",
  "/images/slider/medicine.png",
  "/images/products/aniseptic.png",
                                                                 
]


export default function Home() {
  return (
    <div className="md:mx-32 mx-8 mt-20">
      <div className="slider">
        <Slider />
      </div>


      {/* FEATURED PRODUCTS */}
      <div className="cards mt-20 ">
        <h1 className="md:text-5xl font-bold text-2xl text-center border-t-2 pt-10">Featured Products</h1>
        <div className="flex flex-wrap justify-evenly">
          {
            card_images.map((value, index) => (
              <ul key={index} className="products-features flex  ">
                <li><Card image_path = {value} /></li>
              </ul>
            ))
          }
        </div>

      </div>



      {/* LATEST PRODUCTS */}
      <div className="cards mt-20 ">
        <h1 className="md:text-5xl font-bold text-2xl text-center border-t-2 pt-10">Latest Products</h1>
        <div className="flex flex-wrap justify-evenly">
          {
            card_images.map((value, index) => (
              <ul key={index} className="products-features flex  ">
                <li><Card image_path = {value} /></li>
              </ul>
            ))
          }
        </div>

      </div>

    </div>
  )
}
