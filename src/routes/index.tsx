import { AppShell, PageHeader } from "@/components/app-shell";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarCheck, Search, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — AI Workplace Assistant" },
      { name: "description", content: "Draft emails, summarize meetings, plan tasks, and research topics with a calm AI assistant." },
    ],
  }),
  component: Home,
});

const TOOLS = [
  { to: "/chat", icon: MessageSquare, title: "Chat", desc: "Conversational assistant for any workplace question.", color: "from-primary/20 to-primary/5" },
  { to: "/email", icon: Mail, title: "Email Generator", desc: "Professional emails with tone and audience controls.", color: "from-accent/40 to-accent/10" },
  { to: "/summarize", icon: FileText, title: "Notes Summarizer", desc: "Turn long notes into decisions and action items.", color: "from-accent/30 to-accent/5" },
  { to: "/planner", icon: CalendarCheck, title: "Task Planner", desc: "Daily or weekly plans prioritized by importance.", color: "from-primary/15 to-primary/5" },
  { to: "/research", icon: Search, title: "Research Assistant", desc: "Briefings, insights, and plain-language explanations.", color: "from-accent/30 to-accent/10" },
] as const;

function Home() {
  return (
    <AppShell>
      <div className="px-6 md:px-12 py-10 md:py-16 max-w-6xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Powered by Lovable AI
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            A calmer way to get
            <br />
            <span className="italic text-primary">your work</span> done.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Lumen handles the repetitive parts of your day — drafting emails, summarizing meetings,
            planning your week, and researching topics — so you can focus on the work that matters.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition">
              Start chatting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/email" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium hover:bg-muted transition">
              Try the email writer
            </Link>
          </div>
        </div>

        <PageHeader title="Choose a tool" subtitle="Five focused assistants for the moments your day asks too much of you." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
