import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "hi" | "hinglish";

type Dict = Record<string, Record<Lang, string>>;

const dict: Dict = {
  appName: {
    en: "BazaarBoost AI",
    hi: "बाज़ारबूस्ट एआई",
    hinglish: "BazaarBoost AI",
  },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड", hinglish: "Dashboard" },
  whatsapp: {
    en: "WhatsApp Messages",
    hi: "व्हाट्सऐप संदेश",
    hinglish: "WhatsApp Messages",
  },
  banners: { en: "Festival Banners", hi: "त्योहार बैनर", hinglish: "Festival Banners" },
  loyalty: { en: "Loyalty Program", hi: "लोयल्टी प्रोग्राम", hinglish: "Loyalty Program" },
  seo: { en: "Local SEO & GMB", hi: "लोकल SEO व GMB", hinglish: "Local SEO & GMB" },
  social: { en: "Social Scheduler", hi: "सोशल शेड्यूलर", hinglish: "Social Scheduler" },
  customers: { en: "Customers & Campaigns", hi: "ग्राहक व कैंपेन", hinglish: "Customers & Campaigns" },
  suggestions: { en: "AI Suggestions", hi: "एआई सुझाव", hinglish: "AI Suggestions" },
  referral: { en: "QR Referral", hi: "क्यूआर रेफरल", hinglish: "QR Referral" },
  getStarted: { en: "Get started", hi: "शुरू करें", hinglish: "Shuru karein" },
  generate: { en: "Generate", hi: "बनाएँ", hinglish: "Banaao" },
  copy: { en: "Copy", hi: "कॉपी करें", hinglish: "Copy karo" },
  openWhatsApp: { en: "Open WhatsApp", hi: "व्हाट्सऐप खोलें", hinglish: "WhatsApp kholo" },
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k].en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  useEffect(() => localStorage.setItem("lang", lang), [lang]);
  const t = useMemo(() => (k: keyof typeof dict) => dict[k][lang] || dict[k].en, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
};

export const useI18n = () => useContext(I18nCtx);
