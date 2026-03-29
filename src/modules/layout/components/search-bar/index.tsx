"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlass } from "@medusajs/icons"

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/tr/store?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
      setQuery("")
    }
  }

  return (
    <div className="relative flex items-center">
      {open ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ürün ara..."
            className="bg-orange-400 text-white placeholder-orange-100 border border-orange-300 rounded-full px-4 py-1 text-sm outline-none w-48"
            onBlur={() => {
              if (!query) setOpen(false)
            }}
          />
          <button type="submit" className="ml-2 text-white hover:text-orange-100">
            <MagnifyingGlass />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="text-white hover:text-orange-100"
          aria-label="Arama"
        >
          <MagnifyingGlass />
        </button>
      )}
    </div>
  )
}
