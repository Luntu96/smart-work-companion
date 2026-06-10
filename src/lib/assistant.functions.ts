import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-3-flash-preview";

function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  return createLovableAiGatewayProvider(key)(MODEL);
}

async function run(system: string, prompt: string) {
  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });
  return { text };
}

// ----- Email Generator -----
const EmailInput = z.object({
  purpose: z.string().min(1),
  audience: z.enum(["client", "manager", "team", "vendor", "other"]),
  tone: z.enum(["formal", "informal", "persuasive", "friendly", "direct"]),
  context: z.string().optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You are an expert business writer. Produce a polished email with a clear subject line.
Format strictly as:
Subject: <subject>

<body>

Keep it concise and adapted to the requested tone and audience.`;
    const prompt = `Purpose: ${data.purpose}
Audience: ${data.audience}
Tone: ${data.tone}
Additional context: ${data.context || "none"}`;
    return run(system, prompt);
  });

// ----- Notes Summarizer -----
const SummarizeInput = z.object({
  notes: z.string().min(10),
});

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SummarizeInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You summarize meeting notes for busy professionals.
Return markdown with these sections:
## Summary
A 2-3 sentence overview.
## Key Points
- bullets
## Decisions
- bullets
## Action Items
- [ ] Owner — Task — Deadline (if any)
## Deadlines
- bullets
If a section has no content, write "None identified."`;
    return run(system, `Meeting notes:\n\n${data.notes}`);
  });

// ----- Task Planner -----
const PlanInput = z.object({
  tasks: z.string().min(5),
  horizon: z.enum(["day", "week"]),
  hoursAvailable: z.number().min(1).max(80).optional(),
});

export const generatePlan = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PlanInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You are a productivity coach. Build a structured ${"plan"} that prioritizes by urgency and importance (Eisenhower matrix).
Return markdown with:
## Priorities (Top 3)
## Schedule
A time-blocked schedule with realistic durations.
## Optimization Tips
2-4 short suggestions to save time or avoid burnout.
End with a one-line disclaimer reminding the user to adjust based on their real context.`;
    const prompt = `Horizon: ${data.horizon}
Hours available: ${data.hoursAvailable ?? "not specified"}
Tasks / goals:
${data.tasks}`;
    return run(system, prompt);
  });

// ----- Research Assistant -----
const ResearchInput = z.object({
  topic: z.string().min(2),
  source: z.string().optional().default(""),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You are a research assistant. Provide a clear, balanced briefing.
Return markdown with:
## Overview
## Key Insights
- 4-6 bullets
## Recommendations
- 2-4 actionable bullets
## Simplified Explanation
A short paragraph in plain language.
## Caveats
Briefly note limitations, potential bias, and that the user should verify with primary sources.`;
    const prompt = data.source
      ? `Topic: ${data.topic}\n\nSource material to analyze:\n${data.source}`
      : `Topic: ${data.topic}`;
    return run(system, prompt);
  });
