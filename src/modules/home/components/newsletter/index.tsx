"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}/store/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
          body: JSON.stringify({ email }),
        }
      )
      if (res.status === 409) {
        setStatus("duplicate")
      } else if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="bg-gray-900 py-12 mt-6">
      <div className="content-container flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-bold text-white">Kampanyaları Kaçırma!</h2>
        <p className="text-gray-400 text-sm max-w-md">
          E-posta listemize katıl, özel indirimler ve yeni ürün haberlerinden ilk sen haberdar ol.
        </p>

        {status === "success" ? (
          <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold">
            ✅ Kaydınız alındı, teşekkürler!
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                className="flex-1 px-4 py-3 rounded-full text-sm outline-none border-0"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition whitespace-nowrap disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Abone Ol"}
              </button>
            </form>
            {status === "duplicate" && (
              <p className="text-orange-400 text-sm">Bu e-posta zaten kayıtlı.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">Bir hata oluştu, lütfen tekrar deneyin.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
