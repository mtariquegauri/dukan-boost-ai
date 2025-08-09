import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Customers: React.FC = () => {
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState<{ name: string; phone: string }[]>([]);

  const add = () => {
    if (!phone) return;
    setList((l) => [...l, { name, phone }]);
    setPhone("");
    setName("");
  };

  const campaignLink = (msg: string) => `https://wa.me/?text=${encodeURIComponent(msg)}`;

  return (
    <AppLayout>
      <Helmet>
        <title>Customers & Campaigns | BazaarBoost AI</title>
        <meta name="description" content="Build a simple customer list and launch WhatsApp/SMS campaigns." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/customers'} />
      </Helmet>
      <article className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">Customers & Campaigns (Preview)</h1>
          <p className="text-muted-foreground">Store a basic list locally and broadcast via WhatsApp for now.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Add customer</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3 items-start">
            <input className="border rounded-md h-10 px-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border rounded-md h-10 px-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Button variant="hero" onClick={add}>Add</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {list.length === 0 && <p className="text-muted-foreground text-sm">No customers yet.</p>}
            {list.map((c, i) => (
              <div key={i} className="flex items-center justify-between border rounded-md p-2">
                <span className="text-sm">{c.name || 'Customer'} • {c.phone}</span>
                <a className="text-sm text-primary underline" href={campaignLink(`Hello ${c.name || ''}! Special offers for you at our shop.`)} target="_blank" rel="noreferrer">Message</a>
              </div>
            ))}
          </CardContent>
        </Card>
      </article>
    </AppLayout>
  );
};

export default Customers;
