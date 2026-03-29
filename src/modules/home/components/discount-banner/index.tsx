"use client"

import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type AnnouncementData = {
  text: string
  code?: string
  link?: string
  bg_from?: string
  bg_to?: string
}

export default function DiscountBanner() {
  const [closed, setClosed] = useState(false)
  const [announcement, setAnnouncement] = useState<AnnouncementData | null>(null)

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/content-blocks?type=announcement`,
      {
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.blocks && data.blocks.length > 0) {
          setAnnouncement(data.blocks[0].data)
        }
      })
      .catch(() => {})
  }, [])

  if (closed || !announcement) return null

  const bgStyle =
    announcement.bg_from && announcement.bg_to
      ? { background: `linear-gradient(to right, ${announcement.bg_from}, ${announcement.bg_to})` }
      : {}

  return (
    <div
      className="py-3 px-4 flex items-center justify-between bg-gradient-to-r from-orange-600 to-orange-400"
      style={bgStyle}
    >
      <div className="flex-1 text-center">
        <span className="text-white font-semibold text-sm">
          {announcement.text}
          {announcement.code && (
            <span className="bg-white text-orange-500 px-2 py-0.5 rounded font-bold ml-2">
              {announcement.code}
            </span>
          )}
        </span>
        {announcement.link && (
          <LocalizedClientLink
            href={announcement.link}
            className="text-white underline text-sm ml-4 hover:text-orange-100"
          >
            Hemen Alışveriş Yap →
          </LocalizedClientLink>
        )}
      </div>
      <button
        onClick={() => setClosed(true)}
        className="text-white hover:text-orange-100 ml-4 text-lg"
      >
        ✕
      </button>
    </div>
  )
}
