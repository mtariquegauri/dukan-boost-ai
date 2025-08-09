import React, { useMemo, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const shopExamples: Record<string, string[]> = {
  kirana: ["atta", "dal", "masale", "snacks"],
  boutique: ["sarees", "kurtis", "ethnic wear"],
  electronics: ["earphones", "chargers", "smartwatches"],
};

type Tone = "friendly" | "professional" | "festive";

type Lang = "en" | "hi" | "hinglish";

function buildMessages(params: {
  shopName: string;
  shopType: keyof typeof shopExamples;
  discount: number;
  goal: string;
  tone: Tone;
  lang: Lang;
}) {
  const { shopName, shopType, discount, goal, tone, lang } = params;
  const items = shopExamples[shopType];
  const offerLine = `${discount}% OFF`;

  const en = [
    `Namaste! ${shopName} is offering ${offerLine} on ${items.join(", ")}. ${goal}. Visit today or order on WhatsApp!`,
    `${shopName}: ${offerLine} for a limited time. Trending ${items[0]} and ${items[1]} now in stock. Don't miss out!`,
    `Special offer at ${shopName}! ${offerLine}. Quick order via WhatsApp — fast delivery in your area.`,
  ];

  const hi = [
    `नमस्ते! ${shopName} में ${items.join(", ")} पर ${offerLine}। ${goal}। आज ही आएं या व्हाट्सऐप पर ऑर्डर करें!`,
    `${shopName}: सीमित समय के लिए ${offerLine}। नए ${items[0]} व ${items[1]} उपलब्ध। मौका न चूकें!`,
    `${shopName} पर खास ऑफर! ${offerLine}। व्हाट्सऐप से तुरंत ऑर्डर करें — आपके क्षेत्र में तेज़ डिलीवरी।`,
  ];

  const hinglish = [
    `Namaste! ${shopName} par ${items.join(", ")} pe ${offerLine}. ${goal}. Aaj hi aayein ya WhatsApp par order karein!`,
    `${shopName}: Limited time ${offerLine}. Trending ${items[0]} & ${items[1]} abhi available. Miss mat kijiye!`,
    `Special offer @ ${shopName}! ${offerLine}. WhatsApp se jaldi order karein — fast delivery aapke area me.`,
  ];

  let base = en;
  if (lang === "hi") base = hi;
  if (lang === "hinglish") base = hinglish;

  // tone tweaks
  const tonePrefix =
    tone === "festive"
      ? lang === "hi"
        ? "शुभकामनाएँ! "
        : "Happy wishes! "
      : tone === "friendly"
      ? lang === "hi"
        ? "दोस्ताना सूचना: "
        : "Friendly update: "
      : "";

  return base.map((m) => `${tonePrefix}${m}`);
}

const WhatsApp: React.FC = () => {
  const { t } = useI18n();
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState<"kirana" | "boutique" | "electronics">("kirana");
  const [discount, setDiscount] = useState(20);
  const [goal, setGoal] = useState("New arrivals and special prices for you!");
  const [tone, setTone] = useState<Tone>("festive");
  const [lang, setLang] = useState<Lang>("hinglish");

  const messages = useMemo(
    () =>
      buildMessages({ shopName: shopName || "Your Shop", shopType, discount, goal, tone, lang }),
    [shopName, shopType, discount, goal, tone, lang]
  );

  const copyMsg = async (m: string) => {
    await navigator.clipboard.writeText(m);
    toast({ title: "Copied", description: "Message copied to clipboard" });
  };

  const openWA = (m: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(m)}`;
    window.open(url, "_blank");
  };

  return (
    <AppLayout>
      <Helmet>
        <title>WhatsApp Marketing Generator | BazaarBoost AI</title>
        <meta name="description" content="Auto-generate WhatsApp marketing messages in Hinglish and Indian languages." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/whatsapp'} />
      </Helmet>
      <article className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">{t("whatsapp")}</h1>
          <p className="text-muted-foreground">Create ready-to-send messages tailored to your shop and customers.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Message Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shop">Shop name</Label>
              <Input id="shop" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="e.g., Shree Laxmi Kirana" />
            </div>
            <div className="space-y-2">
              <Label>Shop type</Label>
              <select className="border rounded-md h-10 px-3" value={shopType} onChange={(e) => setShopType(e.target.value as any)}>
                <option value="kirana">Kirana</option>
                <option value="boutique">Boutique</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Discount (%)</Label>
              <Input type="number" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value || "0"))} />
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="border rounded-md h-10 px-3" value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
                <option value="hinglish">Hinglish</option>
                <option value="hi">हिंदी</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Goal</Label>
              <Textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Celebrate Diwali with special offers!" />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <select className="border rounded-md h-10 px-3" value={tone} onChange={(e) => setTone(e.target.value as Tone)}>
                <option value="festive">Festive</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          {messages.map((m, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <CardTitle>Variant {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <Textarea value={m} readOnly className="min-h-32" />
                <div className="flex gap-2">
                  <Button variant="soft" onClick={() => copyMsg(m)}>{t("copy")}</Button>
                  <Button variant="hero" onClick={() => openWA(m)}>{t("openWhatsApp")}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </article>
    </AppLayout>
  );
};

export default WhatsApp;
