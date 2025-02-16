'use client'
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const images = [
  "/images/slider/masks.jpg",
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
    <div className="embla rounded-sm" ref={emblaRef}>
      <div className="embla__container">
        {images.map((src, index) => (
          <div className="embla__slide" key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={500}  // Adjust width as needed
              height={100} // Adjust height as needed
              className="embla__img"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
