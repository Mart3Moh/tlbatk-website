import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Lock, LogOut } from "lucide-react";
import { useOffers, type Offer } from "../context/OffersContext";

export default function OffersAdmin() {
  const { offers, addOffer, deleteOffer, updateOffer } = useOffers();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: 10,
    code: "",
    expiryDate: "",
    active: true,
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSubmitMessage("حجم الصورة يجب أن يكون أقل من 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData({ ...formData, image: base64 });
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem("offersAdmin");
    if (auth) setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === "Ad.Os@2030!") {
      setIsAuthenticated(true);
      sessionStorage.setItem("offersAdmin", "true");
      setPassword("");
      setPasswordError("");
    } else {
      setPasswordError("كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("offersAdmin");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.expiryDate) {
      setSubmitMessage("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    if (new Date(formData.expiryDate) <= new Date()) {
      setSubmitMessage("تاريخ الانتهاء يجب أن يكون في المستقبل");
      return;
    }

    if (editingId) {
      updateOffer(editingId, formData);
      setSubmitMessage("✓ تم تحديث العرض بنجاح");
      setEditingId(null);
    } else {
      addOffer(formData);
      setSubmitMessage("✓ تم إضافة العرض بنجاح");
    }

    setFormData({
      title: "",
      description: "",
      discount: 10,
      code: "",
      expiryDate: "",
      active: true,
      image: "",
    });
    setImagePreview(null);

    setTimeout(() => setSubmitMessage(""), 3000);
  };

  const handleEdit = (offer: Offer) => {
    setFormData({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      code: offer.code || "",
      expiryDate: offer.expiryDate,
      active: offer.active,
      image: offer.image || "",
    });
    setImagePreview(offer.image || null);
    setEditingId(offer.id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setImagePreview(null);
    setFormData({
      title: "",
      description: "",
      discount: 10,
      code: "",
      expiryDate: "",
      active: true,
      image: "",
    });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-5">
        <div className="rounded-3xl bg-white p-8 md:p-12 shadow-lg max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-leaf-deep">
              <Lock className="h-8 w-8" />
            </div>
          </div>

          <h1 className="font-display text-2xl font-black text-center text-ink mb-2">لوحة تحكم العروض</h1>
          <p className="text-center text-ink-soft mb-8">الدخول آمن بكلمة مرور</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-ink mb-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="أدخل كلمة المرور"
                className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
              />
              {passwordError && <p className="text-sm text-red-600 mt-2">{passwordError}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-leaf px-4 py-3 font-bold text-ink transition hover:brightness-105"
            >
              الدخول
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Admin Panel
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-black text-ink">إدارة العروض</h1>
            <p className="text-ink-soft mt-1">أضف أو عدّل أو احذف العروض</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-red-600 transition hover:bg-red-200"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
        </div>

        {/* Form */}
        <div className="rounded-3xl bg-white p-7 md:p-10 mb-8">
          <h2 className="font-display text-xl font-black text-ink mb-6">
            {editingId ? "تعديل العرض" : "إضافة عرض جديد"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-ink mb-2">اسم العرض *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: توصيل مجاني"
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2">نسبة الخصم % *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">وصف العرض *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="اكتب وصف العرض..."
                rows={3}
                className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20 resize-none"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-ink mb-2">كود الخصم (اختياري)</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="مثال: SAVE20"
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink mb-2">تاريخ الانتهاء *</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-ink mb-2">صورة العرض (اختياري)</label>
              <div className="rounded-lg border-2 border-dashed border-line p-6 bg-cream/50 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img src={imagePreview} alt="معاينة" className="h-32 mx-auto rounded-lg object-cover" />
                      <p className="text-sm text-ink-soft">اضغط لتغيير الصورة</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-ink">اضغط لرفع صورة</p>
                      <p className="text-xs text-ink-soft">PNG, JPG بحد أقصى 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 rounded border-line cursor-pointer"
              />
              <label htmlFor="active" className="font-bold text-ink cursor-pointer">
                العرض مفعّل
              </label>
            </div>

            {submitMessage && (
              <div className={`rounded-lg p-4 text-sm font-bold ${submitMessage.includes("✓") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {submitMessage}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-leaf px-6 py-3 font-bold text-ink transition hover:brightness-105"
              >
                <Plus className="h-4 w-4" />
                {editingId ? "تحديث العرض" : "إضافة العرض"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 rounded-lg bg-cream px-6 py-3 font-bold text-ink transition hover:bg-line"
                >
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Offers List */}
        <div>
          <h2 className="font-display text-xl font-black text-ink mb-6">
            العروض الموجودة ({offers.length})
          </h2>

          {offers.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-line bg-white p-12 text-center">
              <p className="text-ink-soft">لا توجد عروض حتى الآن</p>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-2xl bg-white border border-line hover:border-leaf transition overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 p-5">
                    {offer.image && (
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-lg font-black text-ink">{offer.title}</h3>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${offer.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                          {offer.active ? "مفعّل" : "معطّل"}
                        </span>
                      </div>
                      <p className="text-ink-soft mb-2">{offer.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-ink-soft">
                        <span>خصم: <strong className="text-leaf-deep">{offer.discount}%</strong></span>
                        {offer.code && <span>الكود: <strong className="text-ink">{offer.code}</strong></span>}
                        <span>الانتهاء: <strong>{new Date(offer.expiryDate).toLocaleDateString("ar-SA")}</strong></span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        title="تعديل"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
