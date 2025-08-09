import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Loyalty: React.FC = () => {
  return (
    <AppLayout>
      <Helmet>
        <title>Loyalty Program | BazaarBoost AI</title>
        <meta name="description" content="Manage customer points and rewards. Connect backend later for persistence." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/loyalty'} />
      </Helmet>
      <article className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">Loyalty Program (Preview)</h1>
          <p className="text-muted-foreground">Track points and rewards. For multi-device sync and SMS automation, we'll connect a backend.</p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Coming soon</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Issue and redeem points</li>
              <li>Offer tiers and birthday bonuses</li>
              <li>Auto-reminders and win-back campaigns</li>
            </ul>
          </CardContent>
        </Card>
      </article>
    </AppLayout>
  );
};

export default Loyalty;
