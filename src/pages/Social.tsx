import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Social: React.FC = () => {
  const [posts, setPosts] = React.useState<{ text: string; date: string }[]>([]);
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState("");

  const add = () => {
    if (!text || !date) return;
    setPosts((p) => [...p, { text, date }]);
    setText("");
    setDate("");
  };

  return (
    <AppLayout>
      <Helmet>
        <title>Social Scheduler | BazaarBoost AI</title>
        <meta name="description" content="Plan Instagram and Facebook posts. Backend integration coming soon for auto-publish." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/social'} />
      </Helmet>
      <article className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">Social Media Scheduler (Preview)</h1>
          <p className="text-muted-foreground">Craft and plan posts; export and publish manually for now.</p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Create post</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3 items-start">
            <textarea className="border rounded-md p-2 md:col-span-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your caption..." />
            <input type="datetime-local" className="border rounded-md h-10 px-3" value={date} onChange={(e) => setDate(e.target.value)} />
            <div className="md:col-span-3"><Button variant="hero" onClick={add}>Add to plan</Button></div>
          </CardContent>
        </Card>

        <section className="grid gap-3">
          {posts.map((p, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <p className="text-sm whitespace-pre-wrap">{p.text}</p>
                <span className="text-xs text-muted-foreground">{new Date(p.date).toLocaleString()}</span>
              </CardContent>
            </Card>
          ))}
        </section>
      </article>
    </AppLayout>
  );
};

export default Social;
