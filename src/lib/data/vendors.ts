"use server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const storeHeaders = {
  "x-publishable-api-key": PUBLISHABLE_KEY,
}

export type Vendor = {
  id: string
  name: string
  handle: string
  email: string
  phone: string | null
  description: string | null
  logo_url: string | null
  commission_rate: number
  status: "pending" | "active" | "rejected"
}

export async function listVendors(): Promise<Vendor[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/vendors`, {
      headers: storeHeaders,
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.vendors ?? []
  } catch {
    return []
  }
}

export async function retrieveVendor(handle: string): Promise<Vendor | null> {
  try {
    const vendors = await listVendors()
    return vendors.find((v) => v.handle === handle) ?? null
  } catch {
    return null
  }
}

export async function getVendorProducts(vendorId: string): Promise<any[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/vendors/${vendorId}/products`, {
      headers: storeHeaders,
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.products ?? []
  } catch {
    return []
  }
}

export async function getProductVendor(productId: string): Promise<Vendor | null> {
  try {
    const vendors = await listVendors()
    for (const vendor of vendors) {
      const products = await getVendorProducts(vendor.id)
      if (products.some((p: any) => p.id === productId)) {
        return vendor
      }
    }
    return null
  } catch {
    return null
  }
}

export async function buildProductVendorMap(): Promise<Record<string, Vendor>> {
  try {
    const vendors = await listVendors()
    const map: Record<string, Vendor> = {}
    await Promise.all(
      vendors.map(async (vendor) => {
        const products = await getVendorProducts(vendor.id)
        for (const p of products) {
          map[p.id] = vendor
        }
      })
    )
    return map
  } catch {
    return {}
  }
}
