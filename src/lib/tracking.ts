import { TRACKING_API_URL } from "../config";

/**
 * نموذج بيانات التتبع.
 * لو ربطت API خارجي، خلّه يرجّع JSON بنفس هذي الحقول.
 */
export type TrackStage =
  | "received"
  | "processing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface TrackEvent {
  stage: TrackStage;
  title: string;
  description: string;
  timestamp: string; // نص جاهز للعرض، مثل "اليوم 2:15 م"
  done: boolean;
}

export interface TrackResult {
  code: string;
  recipient?: string;
  city?: string;
  service?: string;
  currentStage: TrackStage;
  estimated?: string;
  events: TrackEvent[];
}

const STAGE_ORDER: TrackStage[] = [
  "received",
  "processing",
  "out_for_delivery",
  "delivered",
];

const STAGE_META: Record<TrackStage, { title: string; description: string }> = {
  received: { title: "تم استلام الطلب", description: "وصلنا طلبك وسجّلناه في النظام." },
  processing: { title: "قيد التجهيز", description: "نجهّز طلبك ونغلّفه استعداداً للشحن." },
  out_for_delivery: { title: "خرج للتوصيل", description: "المندوب في الطريق إليك." },
  delivered: { title: "تم التسليم", description: "تم تسليم الطلب بنجاح. نتمنى لك تجربة سعيدة." },
  cancelled: { title: "أُلغي الطلب", description: "تم إلغاء هذا الطلب. لأي استفسار تواصل معنا." },
};

/**
 * تتبّع طلب عبر رقمه.
 * - إذا ضبطت TRACKING_API_URL: يجيب البيانات من الـ API الحقيقي.
 * - غير كذا: يرجّع بيانات تجريبية ثابتة لكل رقم (للعرض قبل الربط).
 */
export async function trackOrder(rawCode: string): Promise<TrackResult | null> {
  const code = rawCode.trim();
  if (!code) return null;

  // ===== وضع الـ API الحقيقي =====
  if (TRACKING_API_URL) {
    try {
      const res = await fetch(
        `${TRACKING_API_URL}?code=${encodeURIComponent(code)}`,
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) return null;
      return (await res.json()) as TrackResult;
    } catch {
      return null;
    }
  }

  // ===== وضع تجريبي (Mock) — احذفه بعد ربط الـ API =====
  await new Promise((r) => setTimeout(r, 650)); // محاكاة زمن الشبكة
  return mockResult(code);
}

function mockResult(code: string): TrackResult {
  const digits = code.replace(/\D/g, "");
  if (!digits) return notFoundLike(code);

  // مرحلة ثابتة مشتقة من الرقم حتى يكون نفس النتيجة لنفس الرقم
  const stageIndex =
    digits.split("").reduce((s, d) => s + Number(d), 0) % STAGE_ORDER.length;
  const currentStage = STAGE_ORDER[stageIndex];
  const cities = ["جدة", "مكة", "الرياض", "المدينة", "الدمام"];
  const city = cities[Number(digits[0] || 0) % cities.length];

  const times = ["أمس 6:40 م", "اليوم 9:15 ص", "اليوم 11:30 ص", "اليوم 1:05 م"];
  const events: TrackEvent[] = STAGE_ORDER.map((stage, i) => ({
    stage,
    ...STAGE_META[stage],
    timestamp: i <= stageIndex ? times[i] : "",
    done: i <= stageIndex,
  }));

  return {
    code,
    recipient: "عميل طلباتك",
    city,
    service: "توصيل داخل المدينة",
    currentStage,
    estimated:
      currentStage === "delivered" ? undefined : "خلال 24 ساعة",
    events,
  };
}

function notFoundLike(code: string): TrackResult {
  return {
    code,
    currentStage: "received",
    events: STAGE_ORDER.map((stage, i) => ({
      stage,
      ...STAGE_META[stage],
      timestamp: i === 0 ? "الآن" : "",
      done: i === 0,
    })),
  };
}
