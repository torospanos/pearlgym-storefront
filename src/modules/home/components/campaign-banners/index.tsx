import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CampaignData = {
  badge?: string
  title: string
  subtitle?: string
  cta_text?: string
  cta_href?: string
  bg_from?: string
  bg_to?: string
}

const fallbackBanners: CampaignData[] = [
  {
    badge: "Özel Kampanya",
    title: "Dambıl Setlerinde",
    subtitle: "İndirim Fırsatı",
    cta_text: "Hemen Al",
    cta_href: "/store",
    bg_from: "#f97316",
    bg_to: "#fb923c",
  },
  {
    badge: "Yeni Koleksiyon",
    title: "Yoga & Pilates",
    subtitle: "Ekipmanları",
    cta_text: "Keşfet",
    cta_href: "/store",
    bg_from: "#a855f7",
    bg_to: "#ec4899",
  },
]

async function getCampaigns(): Promise<CampaignData[]> {
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/content-blocks?type=campaign`,
      {
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        next: { revalidate: 60 },
      }
    )
    const data = await res.json()
    if (data.blocks && data.blocks.length > 0) {
      return data.blocks.map((b: any) => b.data)
    }
  } catch {}
  return fallbackBanners
}

export default async function CampaignBanners() {
  const banners = await getCampaigns()

  if (banners.length === 0) return null

  return (
    <div className="content-container mb-6">
      <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
        {banners.map((banner, i) => (
          <div
            key={i}
            className="rounded-xl p-6 flex flex-col justify-center"
            style={{
              background:
                banner.bg_from && banner.bg_to
                  ? `linear-gradient(to right, ${banner.bg_from}, ${banner.bg_to})`
                  : "#f97316",
            }}
          >
            {banner.badge && (
              <p className="text-white text-sm font-medium">{banner.badge}</p>
            )}
            <h3 className="text-white text-xl font-bold mt-1">{banner.title}</h3>
            {banner.subtitle && (
              <h3 className="text-white text-xl font-bold">{banner.subtitle}</h3>
            )}
            {banner.cta_text && (
              <LocalizedClientLink href={banner.cta_href || "/store"}>
                <button className="mt-4 bg-white font-semibold px-5 py-2 rounded-full text-sm hover:opacity-90 transition w-fit text-gray-800">
                  {banner.cta_text}
                </button>
              </LocalizedClientLink>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
