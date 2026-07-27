import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  FileCode2,
  FileText,
  GitBranch,
  History,
  Loader2,
  Menu,
  MessageSquare,
  Network,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  TestTube2,
  X,
} from "lucide-react";
import { isAuthenticated } from "@/lib/demo-auth";
import { runMission, getProjects } from "@/lib/api";
import { Sidebar } from "@/components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

type MissionStatus = "planning" | "awaiting-approval" | "implementing" | "complete";

const agents = [
  {
    name: "Architect Agent",
    detail: "Mapped auth boundaries and middleware",
    icon: Network,
    color: "text-violet-300",
    time: "09:14",
  },
  {
    name: "Repository Intelligence",
    detail: "Found 12 guarded routes and 4 API groups",
    icon: Sparkles,
    color: "text-cyan-300",
    time: "09:15",
  },
  {
    name: "Builder Agent",
    detail: "Prepared roles, policies, and migration",
    icon: Code2,
    color: "text-fuchsia-300",
    time: "09:19",
  },
  {
    name: "Test Agent",
    detail: "Outlined 24 authorization test cases",
    icon: TestTube2,
    color: "text-emerald-300",
    time: "09:21",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MissionStatus>("awaiting-approval");
  const [mission, setMission] = useState("Add role-based authentication");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isTweaking, setIsTweaking] = useState(false);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const currentProjectName = projects.length > 0 ? projects[0].name : "ecommerce-platform-v2";

  const handleRunMission = async () => {
    setStatus("planning");
    setLlmResponse(null);
    try {
      const data = await runMission(mission, "architect");
      setLlmResponse(data.response);
      setStatus("awaiting-approval");
    } catch (error) {
      console.error(error);
      setLlmResponse("Error: Could not connect to AI engine.");
      setStatus("awaiting-approval");
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) navigate({ to: "/login" });
  }, [navigate]);

  const statusCopy = {
    planning: ["Planning mission", "Agents are creating an implementation plan."],
    "awaiting-approval": ["Plan ready for review", "4 agents have completed their analysis."],
    implementing: [
      "Implementation in progress",
      "Builder Agent is applying the approved change set.",
    ],
    complete: ["Mission complete", "The change set is ready for your pull request."],
  }[status];

  return (
    <main className="min-h-screen bg-background text-foreground flex">
      <div className="absolute inset-0 noise pointer-events-none" />
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 min-w-0 overflow-y-auto p-5 md:p-10">
        <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden mb-5 grid size-11 place-items-center rounded-xl border border-border bg-white/5"
              aria-label="Open dashboard navigation"
            >
              <Menu className="size-5" />
            </button>
            <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-300 mb-2">
              CodePilot AI / Autonomous engineering OS
            </p>
            <h1 className="font-display text-4xl md:text-5xl">Mission Control</h1>
            <p className="text-muted-foreground mt-2">
              Give your AI engineering team a goal. Review every decision before it ships.
            </p>
          </div>
          <Link
            to="/import"
            className="rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition flex items-center gap-2 w-max"
          >
            <Plus className="size-4" /> Import repository
          </Link>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(290px,0.75fr)] gap-6">
          <section className="space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8 overflow-hidden relative">
              <div className="absolute -right-24 -top-24 size-64 rounded-full bg-fuchsia-500/15 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Active
                    mission
                  </div>
                  <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1 text-xs text-fuchsia-200">
                    {currentProjectName} / main
                  </span>
                </div>
                <div>
                  <label htmlFor="mission" className="font-display text-2xl">
                    What should the team build?
                  </label>
                  <div className="mt-3 flex flex-col sm:flex-row gap-3">
                    <input
                      id="mission"
                      value={mission}
                      onChange={(event) => setMission(event.target.value)}
                      className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-lg outline-none focus:border-fuchsia-300/60"
                    />
                    <button
                      onClick={handleRunMission}
                      disabled={status === "planning"}
                      className="rounded-2xl bg-foreground text-background px-5 py-4 font-medium hover:opacity-90 transition disabled:opacity-50"
                    >
                      {status === "planning" ? "Planning..." : "Run mission"}
                    </button>
                  </div>
                </div>
                <MissionProgress status={status} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-3xl p-6">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Plan & review
                    </p>
                    <h2 className="font-display text-2xl mt-1">{statusCopy[0]}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{statusCopy[1]}</p>
                  </div>
                  <ShieldCheck className="size-6 text-cyan-300" />
                </div>
                {llmResponse ? (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                    {llmResponse}
                  </div>
                ) : (
                  <ol className="space-y-3">
                    {[
                      "Create roles and permission schema",
                      "Protect API groups with policy middleware",
                      "Add team role management UI",
                      "Generate authorization regression tests",
                    ].map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm">
                        <span className="grid place-items-center shrink-0 size-5 rounded-full bg-white/10 text-xs">
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
                {status === "awaiting-approval" && (
                  <div className="mt-6 space-y-3 border-t border-border pt-5">
                    <p className="text-sm font-medium">Have feedback for the Architect Agent?</p>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <input
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="e.g. Use Postgres instead of Redis"
                          className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-fuchsia-300/60 transition-colors"
                          disabled={isTweaking}
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!feedback) return;
                          setIsTweaking(true);
                          setTimeout(() => {
                            setIsTweaking(false);
                            setFeedback("");
                          }, 1500);
                        }}
                        disabled={!feedback || isTweaking}
                        className="grid size-10 place-items-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                      >
                        {isTweaking ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <ArrowRight className="size-4" />
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => setStatus("implementing")}
                      className="w-full rounded-xl bg-fuchsia-300 text-background py-3 text-sm font-semibold hover:bg-fuchsia-200 transition mt-2"
                    >
                      Approve & implement
                    </button>
                  </div>
                )}
                {status === "implementing" && (
                  <button
                    onClick={() => setStatus("complete")}
                    className="mt-6 w-full rounded-xl bg-cyan-300 text-background py-3 text-sm font-semibold hover:bg-cyan-200 transition"
                  >
                    Mark implementation complete
                  </button>
                )}
                {status === "complete" && (
                  <div className="mt-6 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300 flex items-center gap-2">
                    <Check className="size-4" /> Ready to present a pull request
                  </div>
                )}
              </div>

              <div className="glass rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Proposed change set
                </p>
                <h2 className="font-display text-2xl mt-1 mb-5">Files the agents will touch</h2>
                <div className="space-y-3">
                  <ChangeFile
                    file="src/server/auth/policies.ts"
                    change="New"
                    tone="text-emerald-300"
                  />
                  <ChangeFile
                    file="src/server/middleware/authorize.ts"
                    change="Edit"
                    tone="text-cyan-300"
                  />
                  <ChangeFile
                    file="src/routes/settings/roles.tsx"
                    change="New"
                    tone="text-emerald-300"
                  />
                  <ChangeFile
                    file="tests/auth/authorization.test.ts"
                    change="New"
                    tone="text-emerald-300"
                  />
                </div>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">+ 318 / − 12 lines</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-sm flex items-center gap-1 hover:text-fuchsia-200 transition-colors">
                        View diff <ChevronRight className="size-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col glass !bg-background/95 !border-white/10 shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl flex items-center gap-2 text-foreground">
                          <FileCode2 className="size-5 text-cyan-300" />
                          src/server/middleware/authorize.ts
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="flex-1 mt-4 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                        <div className="p-4 font-mono text-sm leading-relaxed whitespace-pre overflow-x-auto">
                          <div className="text-muted-foreground opacity-50 mb-4">
                            @@ -14,6 +14,21 @@
                          </div>
                          <div className="flex">
                            <span className="w-8 text-muted-foreground shrink-0 select-none opacity-50">
                              14
                            </span>
                            <span className="text-muted-foreground">
                              export const requireAuth = async (req, res, next) =&gt; {"{"}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-8 text-muted-foreground shrink-0 select-none opacity-50">
                              15
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              const token = req.headers.authorization?.split(" ")[1];
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-8 text-muted-foreground shrink-0 select-none opacity-50">
                              16
                            </span>
                            <span className="text-muted-foreground">
                              {" "}
                              if (!token) return res.status(401).json({"{"} error: "Unauthorized"{" "}
                              {"}"});
                            </span>
                          </div>
                          <div className="flex bg-fuchsia-500/10">
                            <span className="w-8 text-fuchsia-300 shrink-0 select-none">-</span>
                            <span className="text-fuchsia-300 line-through decoration-fuchsia-500/50">
                              {" "}
                              // TODO: Add role checking
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">
                              {" "}
                              const user = await verifyToken(token);
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300"> req.user = user;</span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300"> next();</span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">{"}"};</span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300"></span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">
                              export const requireRole = (allowedRoles: string[]) =&gt; {"{"}
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">
                              {" "}
                              return async (req, res, next) =&gt; {"{"}
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">
                              {" "}
                              if (!req.user) return res.status(401).json({"{"} error: "Unauthorized"{" "}
                              {"}"});
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">
                              {" "}
                              if (!allowedRoles.includes(req.user.role)) {"{"}
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300">
                              {" "}
                              return res.status(403).json({"{"} error: "Forbidden: Insufficient
                              role" {"}"});
                            </span>
                          </div>
                          <div className="flex bg-emerald-500/10">
                            <span className="w-8 text-emerald-400 shrink-0 select-none">+</span>
                            <span className="text-emerald-300"> {"}"}</span>
                          </div>
                          <div className="flex">
                            <span className="w-8 text-muted-foreground shrink-0 select-none opacity-50">
                              17
                            </span>
                            <span className="text-muted-foreground"> next();</span>
                          </div>
                          <div className="flex">
                            <span className="w-8 text-muted-foreground shrink-0 select-none opacity-50">
                              18
                            </span>
                            <span className="text-muted-foreground">{"}"};</span>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <History className="size-5 text-fuchsia-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Engineering memory
                  </p>
                  <h2 className="font-display text-2xl">Context agents retain</h2>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <Memory label="Architecture" value="Next.js API + Postgres" />
                <Memory label="Team convention" value="Zod at every boundary" />
                <Memory label="Previous decision" value="JWTs expire in 15 minutes" />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Live coordination
                  </p>
                  <h2 className="font-display text-2xl">Agent timeline</h2>
                </div>
                <Bot className="size-5 text-fuchsia-300" />
              </div>
              <div className="relative pl-5 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {agents.map((agent) => (
                  <AgentEvent key={agent.name} {...agent} />
                ))}
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Repository intelligence
              </p>
              <h2 className="font-display text-2xl mt-1 mb-5">Conceptual map</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Authentication",
                  "Payments",
                  "Orders",
                  "Products",
                  "Notifications",
                  "API",
                  "Database",
                ].map((tag) => (
                  <span
                    className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-border text-sm text-muted-foreground flex items-center gap-2">
                <GitBranch className="size-4 text-cyan-300" /> 148 files indexed · 12 services
                mapped
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function MissionProgress({ status }: { status: MissionStatus }) {
  const steps = ["Understand", "Plan", "Review", "Generate", "Self-check", "Present diff", "Apply"];
  const active =
    status === "planning"
      ? 1
      : status === "awaiting-approval"
        ? 2
        : status === "implementing"
          ? 4
          : 6;
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {steps.map((step, index) => (
        <div className="flex items-center gap-1 shrink-0" key={step}>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] ${index <= active ? "bg-fuchsia-300/15 text-fuchsia-100" : "bg-white/5 text-muted-foreground"}`}
          >
            {index < active ? "✓ " : ""}
            {step}
          </span>
          {index < steps.length - 1 && <ChevronRight className="size-3 text-muted-foreground" />}
        </div>
      ))}
    </div>
  );
}
function ChangeFile({ file, change, tone }: { file: string; change: string; tone: string }) {
  return (
    <div className="rounded-xl bg-black/15 border border-white/5 p-3 flex items-center gap-3">
      <FileCode2 className="size-4 text-muted-foreground shrink-0" />
      <span className="font-mono text-xs flex-1 truncate">{file}</span>
      <span className={`text-xs ${tone}`}>{change}</span>
    </div>
  );
}
function Memory({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/15 border border-white/5 p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2">{value}</p>
    </div>
  );
}
function AgentEvent({ name, detail, icon: Icon, color, time }: (typeof agents)[number]) {
  return (
    <div className="relative">
      <span className="absolute -left-5 top-1.5 size-3 rounded-full bg-background border border-fuchsia-300" />
      <div className="flex gap-3">
        <div className={`mt-0.5 ${color}`}>
          <Icon className="size-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{name}</p>
            <span className="text-[10px] text-muted-foreground">{time}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">✓ {detail}</p>
        </div>
      </div>
    </div>
  );
}
