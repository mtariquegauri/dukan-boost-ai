import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Suggestions: React.FC = () => {
  const [shopType, setShopType] = React.useState("kirana");
  const [season, setSeason] = React.useState("Festive");

  const ideas = React.useMemo(() => {
    if (shopType === "kirana")
      return [
        "Combo: Atta + Oil at value price",
        "Festival dry fruits small packs",
        "Mid-week 5% off on essentials",
      ];
    if (shopType === "boutique")
      return [
        "Buy 2 kurtis, get 1 scarf",
        "Trending pastel sarees",
        "Kids ethnic set discount",
      ];
    return [
      "Bundle: Earphones + Charger",
      "Weekend smartwatch deal",
      "Exchange old accessories for discount",
    ];
  }, [shopType, season]);

  return (
    <AppLayout>
      <Helmet>
        <title>AI Suggestions | BazaarBoost AI</title>
        <meta name="description" content="Get smart ideas for discounts, bundles, and trending products by category and season." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/suggestions'} />
      </Helmet>
      <article className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">AI Suggestions (Preview)</h1>
          <p className="text-muted-foreground">Rule-based suggestions for now. Full AI integration can be added later.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Context</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <select className="border rounded-md h-10 px-3" value={shopType} onChange={(e) => setShopType(e.target.value)}>
              <option value="kirana">Kirana</option>
              <option value="boutique">Boutique</option>
              <option value="electronics">Electronics</option>
            </select>
            <select className="border rounded-md h-10 px-3" value={season} onChange={(e) => setSeason(e.target.value)}>
              <option>Festive</option>
              <option>Summer</option>
              <option>Monsoon</option>
              <option>Winter</option>
            </select>
          </CardContent>
        </Card>

        <section className="grid gap-3">
          {ideas.map((idea, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <span>{idea}</span>
                <Button variant="soft">Create campaign</Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </article>
    </AppLayout>
  );
};

export default Suggestions;
