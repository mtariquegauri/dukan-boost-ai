import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import { MessageCircle, Image as ImageIcon, Gift, QrCode } from "lucide-react";

const Index = () => {
  const { t } = useI18n();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--pointer-x", `${x}px`);
    el.style.setProperty("--pointer-y", `${y}px`);
  };

  return (
    <AppLayout>
      <Helmet>
        <title>All-in-one Marketing for Indian Retail | BazaarBoost AI</title>
        <meta name="description" content="AI-powered marketing for kirana, boutiques, and electronics stores: WhatsApp, banners, loyalty, SEO, social scheduling and more." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/'} />
        <meta property="og:title" content="BazaarBoost AI" />
        <meta property="og:description" content="Automate your shop's marketing in one place" />
      </Helmet>

      <section onMouseMove={onMove} className="hero-surface rounded-xl p-8 md:p-12 overflow-hidden">
        <div className="relative z-10 max-w-3xl text-primary-foreground">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">AI marketing for Indian retailers</h1>
          <p className="mt-3 md:mt-4 text-primary-foreground/90 text-base md:text-lg">Auto-generate WhatsApp messages, festival banners, loyalty and more — in English, Hindi, and Hinglish.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg"><Link to="/whatsapp">Create WhatsApp campaign</Link></Button>
            <Button asChild variant="soft" size="lg"><Link to="/banners">Make festival banner</Link></Button>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/whatsapp">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-start gap-3">
              <MessageCircle className="text-primary" />
              <div>
                <h3 className="font-semibold">{t("whatsapp")}</h3>
                <p className="text-sm text-muted-foreground">Hinglish and regional languages</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/banners">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-start gap-3">
              <ImageIcon className="text-primary" />
              <div>
                <h3 className="font-semibold">{t("banners")}</h3>
                <p className="text-sm text-muted-foreground">Diwali, Holi, Rakhi, and more</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/suggestions">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-start gap-3">
              <Gift className="text-primary" />
              <div>
                <h3 className="font-semibold">{t("suggestions")}</h3>
                <p className="text-sm text-muted-foreground">Discounts & trending products</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/referral">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-start gap-3">
              <QrCode className="text-primary" />
              <div>
                <h3 className="font-semibold">{t("referral")}</h3>
                <p className="text-sm text-muted-foreground">QR codes for referrals</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>
    </AppLayout>
  );
};

export default Index;
