/**
 * ⚙️ إعدادات طلباتك — عدّل القيم هنا فقط.
 * Edit your business details in THIS file only.
 */

// رقم الواتساب بصيغة دولية بدون + أو أصفار أو مسافات. مثال: 9665XXXXXXXX
export const WHATSAPP_NUMBER = "966541722219"; // ← غيّر هذا الرقم برقمك

// رسالة افتراضية تُرسل عند الضغط على زر الطلب من غير ما يكتب العميل شي.
export const DEFAULT_ORDER_MESSAGE = "السلام عليكم، أبغى مندوب متفرغ الآن:";

export const BRAND = {
  name: "طلباتك",
  latin: "TLBATK",
  tagline: "نوصّل طلباتك بسرعة ونعكس احترافية متجرك",
  city: "جدة و مكة",
  email: "info@tlbatksa.com", // ← غيّره
  instagram: "https://instagram.com/tlbatk.ksa", // ← غيّره
  x: "https://x.com/", // ← غيّره
};

/**
 * 🔌 ربط التتبع بمنصة خارجية (سلة / زد / API خاص).
 * لو خليته فاضي، تشتغل صفحة التتبع بوضع تجريبي (بيانات وهمية).
 * لمّا تجهّز الـ API، حط الرابط هنا أو في متغيّر بيئة VITE_TRACKING_API_URL على Vercel.
 * المتوقع: GET {TRACKING_API_URL}?code=رقم_الطلب  يرجّع JSON بصيغة TrackResult (انظر src/lib/tracking.ts)
 */
export const TRACKING_API_URL =
  (import.meta.env.VITE_TRACKING_API_URL as string | undefined) || "";

// المنصّات اللي نربط معها (تظهر في قسم الربط).
export const INTEGRATIONS = ["سلة", "زد", "شوبيفاي", "ووكومرس", "ربط API مخصص"];

/**
 * 💰 أسعار الشحن — عدّل القيم حسب تسعيرتك الفعلية.
 * المعادلة: السعر = سعر الوجهة + (كل كيلو إضافي فوق المشمول × سعر الكيلو) + (الدفع عند الاستلام إن وُجد)، ثم × عدد الشحنات.
 */
export const PRICING = {
  currency: "ريال",
  freeKg: 10, // أول 10 كجم مشمولة في سعر التوصيل الأساسي
  perKgOver: 2, // سعر كل كيلو إضافي بعد المشمول
  codFee: 5, // رسوم خدمة الدفع عند الاستلام
  zones: [
    { id: "near", label: "أحياء قريبة", base: 15, eta: "خلال ساعة" },
    { id: "mid", label: "داخل جدة", base: 20, eta: "خلال ساعتين" },
    { id: "far", label: "أطراف جدة", base: 28, eta: "خلال اليوم" },
  ],
};

/**
 * ⭐ آراء العملاء — أضف/عدّل الشهادات هنا.
 */
export const TESTIMONIALS = [
  {
    name: "متجر لمسة",
    role: "متجر إلكتروني — منتجات منزلية",
    quote:
      "صار توصيل طلباتنا أسرع بكثير، والعميل يتابع شحنته بنفسه. خدمة احترافية ودعم يرد بسرعة.",
    rating: 5,
  },
  {
    name: "متجر فاشن ستايل",
    role: "متجر إلكتروني — ملابس",
    quote:
      "السرعة في تخصيص المندوب فرق معنا. الطلب يوصل وهو بأفضل حالة وهذا انعكس على تقييمات عملائنا.",
    rating: 5,
  },
  {
    name: "خالد العتيبي",
    role: "متجر محلي — إكسسوارات",
    quote:
      "أسعارهم واضحة من البداية وما فيه مفاجآت، وتغطيتهم لأحياء جدة ممتازة. شريك توصيل أعتمد عليه.",
    rating: 5,
  },
];

export function waLink(text?: string) {
  const msg = text && text.trim() ? text.trim() : DEFAULT_ORDER_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
