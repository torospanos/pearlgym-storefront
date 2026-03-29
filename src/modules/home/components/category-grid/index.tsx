import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductCategory = {
  id: string
  name: string
  handle: string
  metadata?: Record<string, string> | null
}

const colors = [
  { bg: "bg-orange-50", border: "border-orange-200", hover: "hover:bg-orange-100" },
  { bg: "bg-purple-50", border: "border-purple-200", hover: "hover:bg-purple-100" },
  { bg: "bg-red-50", border: "border-red-200", hover: "hover:bg-red-100" },
  { bg: "bg-green-50", border: "border-green-200", hover: "hover:bg-green-100" },
  { bg: "bg-blue-50", border: "border-blue-200", hover: "hover:bg-blue-100" },
  { bg: "bg-yellow-50", border: "border-yellow-200", hover: "hover:bg-yellow-100" },
  { bg: "bg-pink-50", border: "border-pink-200", hover: "hover:bg-pink-100" },
]

const defaultIcon = "🏷️"

async function getCategories(): Promise<ProductCategory[]> {
  try {
    const res = await fetch(
      `${process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/product-categories?limit=10`,
      {
        headers: {
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
        },
        next: { revalidate: 60 },
      }
    )
    const data = await res.json()
    return data.product_categories || []
  } catch {
    return []
  }
}

export default async function CategoryGrid() {
  const categories = await getCategories()

  if (categories.length === 0) return null

  return (
    <div className="content-container py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Kategoriler</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat, i) => {
          const color = colors[i % colors.length]
          const icon = (cat.metadata?.icon as string) || defaultIcon
          return (
            <LocalizedClientLink key={cat.id} href={`/categories/${cat.handle}`}>
              <div
                className={`${color.bg} ${color.border} ${color.hover} border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:shadow-md`}
              >
                <span className="text-4xl">{icon}</span>
                <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
