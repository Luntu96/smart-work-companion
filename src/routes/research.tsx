import { AppShell, PageHeader } from "@/components/app-shell";
import { Field, ToolLayout, inputCls, textareaCls } from "@/components/tool-layout";
import { researchTopic } from "@/lib/assistant.functions";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "Research Assistant — Lumen" }, { name: "description", content: "Get clear briefings, insights, and plain-language explanations on any topic." }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [source, setSource] = useState("");

  const m = useMutation({
    mutationFn: () => fn({ data: { topic, source } }),
    onError: (e: Error) => toast.error(e.message || "Research failed"),
  });

  return (
    <AppShell>
      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <PageHeader title="AI Research Assistant" subtitle="Get a balanced briefing on any topic, or paste source material to summarize and analyze." />
        <ToolLayout
          loading={m.isPending}
          result={m.data?.text ?? ""}
          onSubmit={() => topic.trim().length > 1 && m.mutate()}
          submitLabel="Research"
          form={
            <>
              <Field label="Topic or question">
                <input
                  className={inputCls}
                  placeholder="e.g. The state of generative AI in healthcare"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </Field>
              <Field label="Optional: paste an article or source material" hint="Lumen will summarize and pull insights from it.">
                <textarea
                  className={`${textareaCls} min-h-[260px]`}
                  placeholder="Paste text here…"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </Field>
            </>
          }
        />
      </div>
    </AppShell>
  );
}
