import { useMemo, useState } from "react";
import { Minus, Plus, Truck } from "lucide-react";
import { PRICING, waLink } from "../config";

export default function PriceCalculator() {
  const [zoneId, setZoneId] = useState(PRICING.zones[0].id);
  const [weight, setWeight] = useState(1);
  const [qty, setQty] = useState(1);
  const [cod, setCod] = useState(false);

  const zone = PRICING.zones.find((z) => z.id === zoneId)!;

  const { perShipment, total } = useMemo(() => {
    const extraKg = Math.max(0, Math.ceil(weight) - PRICING.freeKg);
    let one = zone.base + extraKg * PRICING.perKgOver;
    if (cod) one += PRICING.codFee;
    return { perShipment: one, total: one * Math.max(1, qty) };
  }, [zone, weight, qty, cod]);

  const fmt = (n: number) => `${n.toLocaleString("en-US")} ${PRICING.currency}`;

  function requestQuote() {
    const msg = `أبغى عرض سعر شحن:\n- الوجهة: ${zone.label}\n- الوزن: ${Math.ceil(
      weight
    )} كجم\n- عدد الشحنات: ${qty}\n- الدفع عند الاستلام: ${cod ? "نعم" : "لا"}\n- التقدير: ${fmt(total)}`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  return (
    <div className="grid gap-6 rounded-[28px] border border-line bg-white p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
      {/* Inputs */}
      <div>
        {/* Destination */}
        <label className="font-display text-sm font-extrabold text-ink">الوجهة</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {PRICING.zones.map((z) => (
            <button
              key={z.id}
              onClick={() => setZoneId(z.id)}
              className={`rounded-xl border px-2 py-2.5 text-sm font-bold transition ${
                z.id === zoneId
                  ? "border-leaf bg-leaf/15 text-ink"
                  : "border-line bg-white text-ink-soft hover:border-leaf/50"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>

        {/* Weight */}
        <div className="mt-6 flex items-center justify-between">
          <label className="font-display text-sm font-extrabold text-ink">الوزن التقريبي</label>
          <span className="text-sm font-bold text-leaf-deep">{Math.ceil(weight)} كجم</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="mt-3 w-full accent-leaf"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-soft/70">
          <span>1 كجم</span>
          <span>30 كجم</span>
        </div>

        {/* Quantity */}
        <div className="mt-6 flex items-center justify-between">
          <label className="font-display text-sm font-extrabold text-ink">عدد الشحنات</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="إنقاص" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition hover:border-leaf">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-display text-lg font-extrabold text-ink">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="زيادة" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition hover:border-leaf">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* COD */}
        <button
          onClick={() => setCod((c) => !c)}
          className="mt-6 flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 text-right transition hover:border-leaf/50"
        >
          <span>
            <span className="block font-bold text-ink">الدفع عند الاستلام</span>
            <span className="block text-xs text-ink-soft">يُضاف {PRICING.codFee} {PRICING.currency} لكل شحنة</span>
          </span>
          <span className={`relative h-7 w-12 rounded-full transition ${cod ? "bg-leaf" : "bg-line"}`}>
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${cod ? "right-1" : "right-6"}`} />
          </span>
        </button>
      </div>

      {/* Result */}
      <div className="flex flex-col rounded-3xl bg-ink p-6 text-white">
        <div className="flex items-center gap-2 text-leaf">
          <Truck className="h-5 w-5" />
          <span className="font-display font-extrabold">التقدير</span>
        </div>

        <div className="mt-5">
          <div className="text-sm text-white/60">السعر التقريبي</div>
          <div className="font-display text-5xl font-black text-white">{fmt(total)}</div>
          {qty > 1 && (
            <div className="mt-1 text-sm text-white/60">{fmt(perShipment)} لكل شحنة</div>
          )}
        </div>

        <dl className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
          <Row label="الوجهة" value={zone.label} />
          <Row label="مدة التوصيل" value={zone.eta} />
          <Row label="الوزن" value={`${Math.ceil(weight)} كجم`} />
          {cod && <Row label="الدفع عند الاستلام" value={`+${PRICING.codFee} ${PRICING.currency}`} />}
        </dl>

        <button
          onClick={requestQuote}
          className="mt-6 rounded-2xl bg-leaf px-6 py-3.5 font-display font-extrabold text-ink transition hover:brightness-105"
        >
          اطلب عرض السعر
        </button>
        <p className="mt-3 text-center text-xs text-white/45">
          الأسعار تقديرية وقابلة للتغيير حسب تفاصيل الشحنة.
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/55">{label}</dt>
      <dd className="font-bold text-white">{value}</dd>
    </div>
  );
}
