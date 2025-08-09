import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const SEO: React.FC = () => {
  const [name, setName] = React.useState("Your Shop");
  const [category, setCategory] = React.useState("Kirana Store");
  const [area, setArea] = React.useState("Andheri, Mumbai");
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: area,
    priceRange: '$$',
    sameAs: [],
  } as const;

  return (
    <AppLayout>
      <Helmet>
        <title>Local SEO & GMB | BazaarBoost AI</title>
        <meta name="description" content="Optimize your Google My Business with AI-crafted descriptions and JSON-LD." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/seo'} />
      </Helmet>
      <article className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">Local SEO & Google My Business</h1>
          <p className="text-muted-foreground">Copy-ready description and structured data for better local discovery.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Business details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm">Name</label>
              <input className="border rounded-md h-10 px-3" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Category</label>
              <input className="border rounded-md h-10 px-3" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Area</label>
              <input className="border rounded-md h-10 px-3" value={area} onChange={(e) => setArea(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea readOnly value={`${name} — ${category} in ${area}. Fresh stock, fair prices, and friendly service. Visit today or order on WhatsApp!`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSON-LD</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea readOnly className="font-mono min-h-40" value={JSON.stringify(jsonLd, null, 2)} />
            <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonLd))}>Copy JSON-LD</Button>
          </CardContent>
        </Card>
      </article>
    </AppLayout>
  );
};

export default SEO;
