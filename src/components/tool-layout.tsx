import { Markdown } from "@/components/markdown";
import { Disclaimer } from "@/components/app-shell";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

export function ToolLayout({
  form,
  result,
  loading,
  onSubmit,
  submitLabel = "Generate",
}: {
  form: ReactNode;
  result: string;
  loading: boolean;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        className="space-y-5"
      >
        {form}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] disabled:opacity-50 hover:opacity-90 transition"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Generating…" : submitLabel}
        </button>
      </form>

      <div>
        <div className="rounded-2xl border border-border bg-surface p-6 min-h-[300px] shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Result</h3>
            {result && (
              <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition">
                <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          {result ? (
            <Markdown>{result}</Markdown>
          ) : loading ? (
            <div className="text-sm text-muted-foreground animate-pulse">Thinking…</div>
          ) : (
            <div className="text-sm text-muted-foreground">Your result will appear here.</div>
          )}
        </div>
        <Disclaimer />
      </div>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-1.5">{label}</div>
      {children}
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground";

export const textareaCls = `${inputCls} resize-y min-h-[120px]`;
