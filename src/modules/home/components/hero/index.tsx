import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-orange-200 relative bg-gradient-to-br from-orange-500 to-orange-400">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-5xl leading-tight text-white font-bold"
          >
            Pearlgym
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-10 text-orange-100 font-normal mt-2"
          >
            Profesyonel Spor Ekipmanları
          </Heading>
          <p className="text-orange-50 mt-4 text-lg">
            Hedeflerine ulaşmak için ihtiyacın olan her şey burada.
          </p>
        </span>
        <LocalizedClientLink href="/store">
          <Button variant="secondary" className="bg-white text-orange-500 hover:bg-orange-50 border-0 font-semibold px-8 py-3 text-base">
            Ürünleri Keşfet
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
