import { AppShell, PageHeader } from "@/components/app-shell";
import { Field, ToolLayout, inputCls, textareaCls } from "@/components/tool-layout";
import { generatePlan } from "@/lib/assistant.functions";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "Task Planner — Lumen" }, { name: "description", content: "Generate a prioritized daily or weekly plan from your task list." }] }),
  component: PlannerPage,
});

function PlannerPage() {
  const fn = useServerFn(generatePlan);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<"day" | "week">("day");
  const [hours, setHours] = useState<string>("8");

  const m = useMutation({
    mutationFn: () =>
      fn({ data: { tasks, horizon, hoursAvailable: hours ? Number(hours) : undefined } }),
    onError: (e: Error) => toast.error(e.message || "Plan failed"),
  });

  return (
    <AppShell>
      <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
        <PageHeader title="AI Task Planner" subtitle="List your tasks and goals. Lumen will prioritize them and time-block your day or week." />
        <ToolLayout
          loading={m.isPending}
          result={m.data?.text ?? ""}
          onSubmit={() => tasks.trim().length > 5 && m.mutate()}
          submitLabel="Generate plan"
          form={
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Horizon">
                  <select className={inputCls} value={horizon} onChange={(e) => setHorizon(e.target.value as "day" | "week")}>
                    <option value="day">Daily plan</option>
                    <option value="week">Weekly plan</option>
                  </select>
                </Field>
                <Field label="Hours available">
                  <input
                    className={inputCls}
                    type="number"
                    min={1}
                    max={80}
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Tasks & goals" hint="One per line works well. Add deadlines or context where useful.">
                <textarea
                  className={`${textareaCls} min-h-[260px]`}
                  placeholder={"Finish Q3 report — due Friday\nPrep client demo\nReview pull requests\n…"}
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  required
                />
              </Field>
            </>
          }
        />
      </div>
    </AppShell>
  );
}
