const fallbackReviews = [
  { name: "Ahmet K.", rating: 5, comment: "Dambıl setini aldım, kalitesi mükemmel. Hızlı kargo için teşekkürler!", product: "Dambıl Seti", date: "Mart 2026" },
  { name: "Zeynep A.", rating: 5, comment: "Yoga matı tam aradığım gibi, kaymıyor ve çok rahat. Kesinlikle tavsiye ederim.", product: "Yoga Matı", date: "Mart 2026" },
  { name: "Murat T.", rating: 4, comment: "Kettlebell sağlam ve kaliteli. Fiyat/performans açısından çok iyi.", product: "Kettlebell", date: "Şubat 2026" },
  { name: "Selin B.", rating: 5, comment: "Direnç bantları harika! Farklı seviyeleri çok işe yarıyor.", product: "Direnç Bandı", date: "Şubat 2026" },
]

async function getReviews() {
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/content-blocks?type=review`,
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
  return fallbackReviews
}

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={s <= count ? "text-orange-400" : "text-gray-300"}>★</span>
    ))}
  </div>
)

export default async function CustomerReviews() {
  const reviews = await getReviews()

  return (
    <div className="content-container py-10">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Müşteri Yorumları</h2>
      <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
        {reviews.map((r: any, i: number) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-sm">
                  {r.name?.[0] || "?"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.product} · {r.date}</p>
                </div>
              </div>
              <Stars count={r.rating} />
            </div>
            <p className="text-sm text-gray-600 mt-2">"{r.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}
