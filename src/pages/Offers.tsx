import { Link } from "react-router-dom";
import { ArrowRight, Zap, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useOffers } from "../context/OffersContext";

export default function Offers() {
  const { offers } = useOffers();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.active && new Date(o.expiryDate) > new Date());

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-leaf py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-ink hover:opacity-80 mb-6 transition">
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-black text-ink">العروض والخصومات</h1>
          <p className="mt-3 text-lg text-ink/75">استفد من أفضل العروض الحصرية</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        {activeOffers.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-line bg-white p-12 text-center">
            <Zap className="h-12 w-12 text-ink-soft/30 mx-auto mb-4" />
            <p className="text-lg text-ink-soft">لا توجد عروض متاحة حالياً</p>
            <p className="text-sm text-ink-soft/60 mt-2">تابعنا للحصول على أحدث العروض</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-3xl border-2 border-leaf bg-white p-7 hover:shadow-lg transition"
              >
                {/* Discount Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-leaf/15 px-4 py-2 mb-4">
                  <Zap className="h-4 w-4 text-leaf-deep" />
                  <span className="font-bold text-leaf-deep">{offer.discount}% خصم</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-black text-ink mb-2">{offer.title}</h3>

                {/* Description */}
                <p className="text-ink-soft leading-relaxed mb-4">{offer.description}</p>

                {/* Expiry Date */}
                <p className="text-sm text-ink-soft/60 mb-5">
                  ينتهي في: {new Date(offer.expiryDate).toLocaleDateString("ar-SA")}
                </p>

                {/* Code */}
                {offer.code && (
                  <div className="rounded-lg bg-cream p-4 mb-4">
                    <p className="text-xs font-bold text-ink-soft mb-2">كود الخصم:</p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="font-mono text-lg font-bold text-ink">{offer.code}</code>
                      <button
                        onClick={() => copyCode(offer.code!)}
                        className="flex items-center gap-2 rounded-lg bg-leaf px-3 py-2 text-sm font-bold text-ink transition hover:brightness-105"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            تم النسخ
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            نسخ
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <a
                  href="https://wa.me/966541722219?text=أبغى أستفيد من العرض"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-lg bg-ink px-4 py-3 text-center font-bold text-white transition hover:brightness-110"
                >
                  استفد من العرض
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
