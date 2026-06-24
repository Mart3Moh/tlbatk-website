import { useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { waLink, BRAND } from "../config";

const quickOrders = [
  "أبغى أطلب من مطعم 🍔",
  "توصيل أغراض من بقالة 🛒",
  "مشوار / استلام وتسليم 🚗",
  "عندي طلب خاص، أبغى أستفسر 💬",
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-[60] md:bottom-8 md:left-8" dir="rtl">
      {open && (
        <div className="mb-3 w-[86vw] max-w-sm origin-bottom-left overflow-hidden rounded-3xl border border-line bg-white shadow-2xl shadow-ink/20 rise">
          <div className="flex items-center gap-3 bg-ink px-4 py-3.5 text-white">
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-leaf">
              <MessageCircle className="h-5 w-5 text-ink" />
              <span className="absolute -top-0.5 -left-0.5 h-3 w-3 rounded-full bg-leaf ring-2 ring-ink" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="font-display text-sm font-extrabold">{BRAND.name} — خدمة الطلبات</div>
              <div className="text-[11px] text-white/70">عادةً نرد خلال دقائق</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="إغلاق" className="rounded-full p-1.5 hover:bg-white/15">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2.5 p-4">
            <p className="rounded-2xl rounded-tr-sm bg-cream p-3 text-sm leading-relaxed text-ink-soft">
              هلا فيك 👋 وش حاب تطلب اليوم؟ اختر أو اكتب لنا مباشرة في واتساب.
            </p>
            <div className="space-y-2">
              {quickOrders.map((q) => (
                <a
                  key={q}
                  href={waLink(q)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-leaf hover:bg-cream"
                >
                  <span>{q}</span>
                  <Send className="h-4 w-4 shrink-0 text-leaf-deep" />
                </a>
              ))}
            </div>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-leaf px-4 py-3 font-display text-sm font-extrabold text-ink transition hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4" /> افتح محادثة واتساب
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="تواصل عبر واتساب"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-leaf shadow-lg shadow-leaf/40 transition hover:scale-105 active:scale-95 md:h-16 md:w-16"
      >
        {open ? (
          <X className="h-6 w-6 text-ink" />
        ) : (
          <MessageCircle className="h-7 w-7 text-ink md:h-8 md:w-8" />
        )}
      </button>
    </div>
  );
}
