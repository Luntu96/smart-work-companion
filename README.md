# Lumen — AI Productivity Assistant

Lumen is an AI-driven productivity assistant designed to simplify and automate repetitive professional tasks. Built with a calm, professional interface, it helps users draft emails, summarize notes, plan schedules, conduct research, and engage in intelligent conversations — all powered by modern AI.

---

## Features

Lumen includes five core productivity tools:

1. **Smart Email Generator**
   - Generate polished, context-aware professional emails
   - Customize tone (formal, informal, persuasive, friendly, direct)
   - Target specific audiences (client, manager, team, vendor)

2. **Meeting Notes Summarizer**
   - Automatically extract key points, decisions, and action items
   - Identify deadlines and assign owners from raw notes
   - Output structured markdown for easy sharing

3. **Task Planner**
   - Build time-blocked daily or weekly schedules
   - Prioritize tasks using the Eisenhower matrix (urgency × importance)
   - Receive optimization tips to avoid burnout

4. **Research Assistant**
   - Generate balanced briefings on any topic
   - Get simplified explanations alongside technical details
   - Built-in caveats remind users to verify with primary sources

5. **AI Chatbot**
   - Real-time conversational interface for general assistance
   - Streaming responses for a smooth, responsive experience
   - Context-aware help for any productivity question

---

## Tools & Technologies

| Category | Technology |
|----------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) — Full-stack React with SSR/SSG |
| Build Tool | Vite 7 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 with OKLCH design tokens |
| UI Components | shadcn/ui |
| Typography | Fraunces (headings), Inter (body) |
| AI SDK | Vercel AI SDK (`ai`, `@ai-sdk/openai-compatible`) |
| AI Provider | Lovable AI Gateway — `google/gemini-3-flash-preview` |
| State & Data | TanStack Query |
| Routing | TanStack Router (file-based) |
| Runtime | Cloudflare Workers (edge) |

---

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- A [Lovable](https://lovable.dev) account with an API key

### 1. Clone & Install

```bash
git clone <repository-url>
cd lumen
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
LOVABLE_API_KEY=your_lovable_api_key_here
```

> **Note:** Your Lovable API key powers all AI features. Keep it secret and never commit it to version control.

### 3. Run the Development Server

```bash
bun dev
```

The app will be available at `http://localhost:3000`.

### 4. Build for Production

```bash
bun run build
```

The production bundle is optimized for edge deployment (Cloudflare Workers).

---

## Project Structure

```
src/
├── components/          # Reusable UI components (AppShell, ToolLayout, Markdown, etc.)
├── components/ui/       # shadcn/ui primitives
├── hooks/               # Custom React hooks
├── lib/
│   ├── ai-gateway.server.ts     # Lovable AI Gateway provider setup
│   ├── assistant.functions.ts   # Server functions (email, summarize, plan, research)
│   └── utils.ts                 # Utility helpers
├── routes/
│   ├── __root.tsx       # Root layout (wraps all pages)
│   ├── index.tsx        # Dashboard overview
│   ├── chat.tsx         # AI Chatbot
│   ├── email.tsx        # Smart Email Generator
│   ├── summarize.tsx    # Meeting Notes Summarizer
│   ├── planner.tsx      # Task Planner
│   ├── research.tsx     # Research Assistant
│   └── api/chat.ts      # Streaming chat API endpoint
├── router.tsx           # TanStack Router configuration
├── start.ts             # Application entry point
└── styles.css           # Global styles & design tokens
```

---

## Responsible AI

Lumen is built with AI safety and transparency in mind:

- **Disclaimers** are included in AI-generated outputs to remind users to review and adjust content.
- **Caveats** in research briefs highlight limitations, potential bias, and the need for primary source verification.
- **Validation steps** encourage human review before sending emails or acting on generated plans.

---

## License

MIT
