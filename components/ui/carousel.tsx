'use client'
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const images = [
  "/images/slider/banner2.jpg",
  "/images/slider/medicine.png"
]

export function Slider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Logs slide elements
    }
  }, [emblaApi])

  return (
    <div className="embla w-full overflow-hidden rounded-sm" ref={emblaRef}>
    <div className="embla__container flex">
      {images.map((src, index) => (
        <div className="embla__slide min-w-full relative aspect-[16/6]" key={index}>
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill 
            className="object-cover w-full"
            priority 
            quality={100} // Avoids Next.js compression
          />
        </div>
      ))}
    </div>
  </div>
  
  )
}
