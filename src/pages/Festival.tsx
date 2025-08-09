import React, { useEffect, useRef, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const festivals = ["Diwali", "Holi", "Raksha Bandhan", "Navratri", "Eid", "Onam", "Pongal"] as const;

const Festival: React.FC = () => {
  const [festival, setFestival] = useState<(typeof festivals)[number]>("Diwali");
  const [shopName, setShopName] = useState("Your Shop");
  const [offer, setOffer] = useState("Flat 25% OFF");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = 1200;
    const height = 630;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Background gradient using design tokens
    const styles = getComputedStyle(document.documentElement);
    const color1 = `hsl(${styles.getPropertyValue("--primary").trim()})`;
    const color2 = `hsl(${styles.getPropertyValue("--accent").trim()})`;
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative circles
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      const r = Math.random() * 6 + 2;
      ctx.arc(Math.random() * width, Math.random() * height, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${33 + Math.random() * 10},95%,60%,0.15)`;
      ctx.fill();
    }

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillText(`${festival} Sale`, 60, 140);

    ctx.font = "bold 88px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillText(offer, 60, 260);

    ctx.font = "600 48px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillText(shopName, 60, 360);

    ctx.font = "400 28px system-ui, -apple-system, Segoe UI, Roboto";
    ctx.fillText("Visit today • Order on WhatsApp", 60, 420);
  }, [festival, shopName, offer]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${festival}-${shopName}-banner.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AppLayout>
      <Helmet>
        <title>Festival Banner Creator | BazaarBoost AI</title>
        <meta name="description" content="Create festive promotional banners for Diwali, Holi, Raksha Bandhan and more." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/banners'} />
      </Helmet>
      <article className="max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">Festival Banners</h1>
          <p className="text-muted-foreground">Generate social-ready images in seconds. Perfect sizes for WhatsApp Status, Instagram, and Facebook.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Banner Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Festival</Label>
              <select className="border rounded-md h-10 px-3" value={festival} onChange={(e) => setFestival(e.target.value as any)}>
                {festivals.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Shop name</Label>
              <Input value={shopName} onChange={(e) => setShopName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Offer line</Label>
              <Input value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="e.g., Flat 25% OFF" />
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <canvas ref={canvasRef} className="w-full rounded-lg border shadow-sm" aria-label="Banner preview" />
          <div>
            <Button variant="hero" onClick={download}>Download PNG</Button>
          </div>
        </section>
      </article>
    </AppLayout>
  );
};

export default Festival;
