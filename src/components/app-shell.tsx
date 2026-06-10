import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, FileText, CalendarCheck, Search, MessageSquare, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type NavItem = { to: string; label: string; icon: LucideIcon; desc: string };

const NAV: NavItem[] = [
  { to: "/", label: "Overview", icon: Sparkles, desc: "All tools" },
  { to: "/chat", label: "Chat", icon: MessageSquare, desc: "Ask anything" },
  { to: "/email", label: "Email", icon: Mail, desc: "Draft messages" },
  { to: "/summarize", label: "Summarize", icon: FileText, desc: "Meeting notes" },
  { to: "/planner", label: "Planner", icon: CalendarCheck, desc: "Daily / weekly" },
  { to: "/research", label: "Research", icon: Search, desc: "Topic briefings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur">
        <div className="px-6 py-7">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
              <Sparkles className="h-4.5 w-4.5" strokeWidth={2.25} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">Lumen</span>
          </Link>
          <p className="mt-2 text-xs text-muted-foreground">Your calm AI workplace assistant</p>
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/75 hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className={`mt-0.5 h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                <div className="flex-1">
                  <div className="font-medium leading-tight">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-5 text-[11px] text-muted-foreground border-t border-border">
          AI can make mistakes. Review outputs before sending.
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold">Lumen</span>
          </Link>
        </header>
        <nav className="md:hidden flex gap-1 overflow-x-auto px-3 py-2 border-b border-border bg-surface/60">
          {NAV.map((item) => {
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-6 text-xs text-muted-foreground border-t border-border pt-4">
      ⓘ AI-generated output may contain errors or bias. Please review before relying on it for important decisions.
    </p>
  );
}
