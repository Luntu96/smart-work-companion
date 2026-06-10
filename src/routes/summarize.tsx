import { AppShell, PageHeader } from "@/components/app-shell";
import { Field, ToolLayout, textareaCls } from "@/components/tool-layout";
import { summarizeNotes } from "@/lib/assistant.functions";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/summarize")({
  head: () => ({ meta: [{ title: "Notes Summarizer — Lumen" }, { name: "description", content: "Turn lengthy notes into summaries, decisions, and action items." }] }),
  component: SummarizePage,
});

function SummarizePage() {
  const fn = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");

  const m = useMutation({
    mutationFn: () => fn({ data: { notes } }),
    onError: (e: Error) => toast.error(e.message || "Summary failed"),
  });

  return (
    <AppShell>
      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <PageHeader title="Meeting Notes Summarizer" subtitle="Paste raw notes or a transcript. Get a clean summary with decisions, action items, and deadlines." />
        <ToolLayout
          loading={m.isPending}
          result={m.data?.text ?? ""}
          onSubmit={() => notes.trim().length > 10 && m.mutate()}
          submitLabel="Summarize"
          form={
            <Field label="Meeting notes or transcript">
              <textarea
                className={`${textareaCls} min-h-[420px]`}
                placeholder="Paste your notes here…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              />
            </Field>
          }
        />
      </div>
    </AppShell>
  );
}
