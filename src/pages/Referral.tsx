import React, { useMemo, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";

const Referral: React.FC = () => {
  const [shop, setShop] = useState("Your Shop");
  const [baseUrl, setBaseUrl] = useState("https://example.com/referral");
  const url = useMemo(() => `${baseUrl}?shop=${encodeURIComponent(shop)}`, [baseUrl, shop]);

  const downloadQR = () => {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas[data-qr]");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${shop}-referral-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AppLayout>
      <Helmet>
        <title>QR Referral Program | BazaarBoost AI</title>
        <meta name="description" content="Create QR codes for customer referrals and share instantly." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/referral'} />
      </Helmet>
      <article className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">QR Referral</h1>
          <p className="text-muted-foreground">Generate a QR code to invite customers to refer friends and earn rewards.</p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 items-end">
            <div className="space-y-2">
              <Label>Shop name</Label>
              <Input value={shop} onChange={(e) => setShop(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Base URL</Label>
              <Input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <Input readOnly value={url} />
              <Button asChild variant="soft"><a href={url} target="_blank" rel="noreferrer">Open</a></Button>
            </div>
          </CardContent>
        </Card>

        <section className="flex flex-col items-center gap-4">
          <QRCodeCanvas value={url} size={256} includeMargin level="M" data-qr="true" />
          <Button variant="hero" onClick={downloadQR}>Download QR</Button>
        </section>
      </article>
    </AppLayout>
  );
};

export default Referral;
