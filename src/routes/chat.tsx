import { AppShell, Disclaimer, PageHeader } from "@/components/app-shell";
import { Markdown } from "@/components/markdown";
import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";
import { DefaultChatTransport } from "ai";
import { Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat — Lumen" }, { name: "description", content: "Chat with your AI workplace assistant." }] }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Help me write a polite follow-up email to a client.",
  "What are good frameworks for prioritizing my week?",
  "Summarize the pros and cons of remote vs hybrid work.",
  "Give me an icebreaker for tomorrow's team meeting.",
];

function ChatPage() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setInput("");
    await sendMessage({ text: t });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <AppShell>
      <div className="flex h-[100dvh] md:h-screen flex-col">
        <div className="px-6 md:px-12 pt-8 pb-4 border-b border-border">
          <PageHeader title="Chat" subtitle="Your interactive workplace assistant. Ask anything — drafts, ideas, explanations." />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-12 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm">Try one of these to get started:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="text-left rounded-xl border border-border bg-surface p-4 text-sm hover:bg-muted transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                  <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                    {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[85%] ${isUser ? "" : "flex-1"}`}>
                    {isUser ? (
                      <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm whitespace-pre-wrap">
                        {text}
                      </div>
                    ) : (
                      <Markdown>{text || "…"}</Markdown>
                    )}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex gap-3">
                <div className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-accent text-accent-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-sm text-muted-foreground animate-pulse mt-1.5">Thinking…</div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border bg-surface/60 backdrop-blur px-4 md:px-12 py-4">
          <form
            onSubmit={(e) => { e.preventDefault(); submit(input); }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow-soft)] focus-within:ring-2 focus-within:ring-ring/30">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                placeholder="Ask Lumen anything…"
                rows={1}
                className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground max-h-40"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <Disclaimer />
          </form>
        </div>
      </div>
    </AppShell>
  );
}
