import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import HeroSlider from "@modules/home/components/hero-slider"
import CategoryGrid from "@modules/home/components/category-grid"
import WhyUs from "@modules/home/components/why-us"
import CustomerReviews from "@modules/home/components/customer-reviews"
import DiscountBanner from "@modules/home/components/discount-banner"
import Newsletter from "@modules/home/components/newsletter"
import BestSellers from "@modules/home/components/best-sellers"
import CampaignBanners from "@modules/home/components/campaign-banners"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Pearlgym | Spor Malzemeleri",
  description:
    "Pearlgym - Kaliteli spor malzemeleri, ekipmanlar ve aksesuarlar.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* İndirim Banner */}
      <DiscountBanner />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Kategori Grid */}
      <CategoryGrid />

      {/* Kampanya Bannerları */}
      <CampaignBanners />

      {/* En Çok Satanlar */}
      <BestSellers region={region} />

      {/* Neden Pearlgym */}
      <WhyUs />

      {/* Öne Çıkan Ürünler */}
      <div className="content-container mt-8 mb-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">Favori Ürünler</h2>
          <LocalizedClientLink href="/store" className="text-orange-500 text-sm font-medium hover:underline">
            Tümünü Gör →
          </LocalizedClientLink>
        </div>
      </div>
      <div className="pb-8">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      {/* Müşteri Yorumları */}
      <CustomerReviews />

      {/* Bülten */}
      <Newsletter />
    </>
  )
}
