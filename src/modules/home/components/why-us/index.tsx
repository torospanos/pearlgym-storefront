const fallbackFeatures = [
  { icon: "🏆", title: "Kaliteli Ürünler", description: "Profesyonel sporculara özel seçilmiş ekipmanlar" },
  { icon: "🚀", title: "Hızlı Teslimat", description: "Siparişleriniz 1-3 iş günü içinde kapınızda" },
  { icon: "🔒", title: "Güvenli Ödeme", description: "256-bit SSL şifreleme ile güvenli alışveriş" },
  { icon: "↩️", title: "Kolay İade", description: "30 gün içinde ücretsiz iade garantisi" },
]

async function getFeatures() {
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/content-blocks?type=feature`,
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
  return fallbackFeatures
}

export default async function WhyUs() {
  const features = await getFeatures()

  return (
    <div className="bg-orange-50 py-10 mt-6">
      <div className="content-container">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Neden Pearlgym?</h2>
        <div className="grid grid-cols-2 small:grid-cols-4 gap-6">
          {features.map((f: any, i: number) => (
            <div key={i} className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
              <span className="text-4xl mb-3">{f.icon}</span>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.description || f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
