'use client'
import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  "/images/slider/banner2.jpg",
  "/images/slider/medicine.png"
]

export function Slider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  // Handlers for navigation
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full">
      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((src, index) => (
            <div className="embla__slide min-w-full relative aspect-[16/6]" key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-[500px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#F3F4F6] text-black p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#F3F4F6] text-black  p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}