import { AppShell, PageHeader } from "@/components/app-shell";
import { Field, ToolLayout, inputCls, textareaCls } from "@/components/tool-layout";
import { generateEmail } from "@/lib/assistant.functions";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Email Generator — Lumen" }, { name: "description", content: "Generate professional emails with the right tone for any audience." }] }),
  component: EmailPage,
});

function EmailPage() {
  const fn = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState<"client" | "manager" | "team" | "vendor" | "other">("client");
  const [tone, setTone] = useState<"formal" | "informal" | "persuasive" | "friendly" | "direct">("formal");
  const [context, setContext] = useState("");

  const m = useMutation({
    mutationFn: () => fn({ data: { purpose, audience, tone, context } }),
    onError: (e: Error) => toast.error(e.message || "Generation failed"),
  });

  return (
    <AppShell>
      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <PageHeader title="Smart Email Generator" subtitle="Describe what you need to say. Lumen will adapt the tone and structure to your audience." />
        <ToolLayout
          loading={m.isPending}
          result={m.data?.text ?? ""}
          onSubmit={() => purpose.trim() && m.mutate()}
          submitLabel="Generate email"
          form={
            <>
              <Field label="What is this email about?">
                <textarea
                  className={textareaCls}
                  placeholder="e.g. Follow up with a client about an overdue invoice and offer flexible payment terms."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Audience">
                  <select className={inputCls} value={audience} onChange={(e) => setAudience(e.target.value as typeof audience)}>
                    <option value="client">Client</option>
                    <option value="manager">Manager</option>
                    <option value="team">Team</option>
                    <option value="vendor">Vendor</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Tone">
                  <select className={inputCls} value={tone} onChange={(e) => setTone(e.target.value as typeof tone)}>
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="persuasive">Persuasive</option>
                    <option value="friendly">Friendly</option>
                    <option value="direct">Direct</option>
                  </select>
                </Field>
              </div>
              <Field label="Additional context (optional)" hint="Names, dates, prior conversation, anything that helps.">
                <textarea
                  className={textareaCls}
                  placeholder="Optional details…"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </Field>
            </>
          }
        />
      </div>
    </AppShell>
  );
}
