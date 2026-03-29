"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Slide = {
  id: string
  title: string
  subtitle: string
  cta_text: string
  cta_href: string
  bg_from: string
  bg_to: string
  sort_order: number
  is_active: boolean
}

const fallbackSlides: Slide[] = [
  {
    id: "1",
    title: "Profesyonel Spor Ekipmanları",
    subtitle: "Hedeflerine ulaşmak için ihtiyacın olan her şey",
    cta_text: "Alışverişe Başla",
    cta_href: "/store",
    bg_from: "#ea580c",
    bg_to: "#fb923c",
    sort_order: 0,
    is_active: true,
  },
]

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/slides`, {
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.slides && data.slides.length > 0) {
          setSlides(data.slides)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const slide = slides[current]

  return (
    <div
      className="relative w-full h-[420px] transition-all duration-700 overflow-hidden"
      style={{
        background: `linear-gradient(to right, ${slide.bg_from}, ${slide.bg_to})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 gap-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">{slide.title}</h1>
        {slide.subtitle && <p className="text-lg text-white/90">{slide.subtitle}</p>}
        {slide.cta_text && (
          <LocalizedClientLink href={slide.cta_href || "/store"}>
            <button className="mt-4 bg-white text-gray-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
              {slide.cta_text}
            </button>
          </LocalizedClientLink>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}
