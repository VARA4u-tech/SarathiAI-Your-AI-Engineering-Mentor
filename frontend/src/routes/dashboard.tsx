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
import {
  runMission,
  getProjects,
  getMissions,
  Project,
  Mission,
  importRepository,
} from "@/lib/api";
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

type MissionStatus = "idle" | "planning" | "awaiting-approval" | "implementing" | "complete";

const agents = [
  {
    name: "Context Scanner",
    detail: "Reads repository boundaries and dependencies",
    icon: Network,
    color: "text-violet-300",
  },
  {
    name: "Security Auditor",
    detail: "Analyzes authentication and authorization flows",
    icon: ShieldCheck,
    color: "text-emerald-300",
  },
  {
    name: "Performance Profiler",
    detail: "Evaluates database queries and caching strategies",
    icon: Activity,
    color: "text-yellow-300",
  },
  {
    name: "Systems Architect",
    detail: "Synthesizes final architectural recommendations",
    icon: Sparkles,
    color: "text-cyan-300",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MissionStatus>("idle");
  const [mission, setMission] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isTweaking, setIsTweaking] = useState(false);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("activeProjectId") : null,
  );

  useEffect(() => {
    getProjects()
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length > 0) {
          const stored = localStorage.getItem("activeProjectId");
          if (!stored || !data.find((p) => p._id === stored)) {
            setActiveProjectId(data[0]._id);
            localStorage.setItem("activeProjectId", data[0]._id);
          }
        }
      })
      .catch((err) => console.error("Failed to load projects", err));

    const importedRepo = localStorage.getItem("importedRepo");
    if (importedRepo) {
      setMission(importedRepo);
      localStorage.removeItem("importedRepo");
    }
  }, []);

  const currentProject = projects.find((p) => p._id === activeProjectId) || null;

  useEffect(() => {
    if (currentProject) {
      getMissions(currentProject._id)
        .then((data) => setMissions(data))
        .catch(console.error);
    } else {
      setMissions([]);
    }
  }, [currentProject]);

  const currentProjectName = currentProject ? currentProject.name : "No Project Selected";

  const handleRunMission = async () => {
    setStatus("planning");
    setLlmResponse(null);
    try {
      // 1. Import Repository
      const project = await importRepository(mission);

      // 2. Fetch projects to update local state so the rest of the app knows about it
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);

      // 3. Automatically trigger the review mission
      const defaultPrompt = "Perform a full senior engineering review of this codebase.";
      const newMission = await runMission(
        defaultPrompt,
        "architect",
        project._id,
        "Senior Engineering Review",
      );

      if (newMission && newMission._id) {
        navigate({ to: "/repositories" });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error(error);
      setLlmResponse("Error: Could not process repository.");
      setStatus("idle");
      alert(
        "Failed to review repository. Make sure the URL is correct and the backend is running.",
      );
    }
  };

  const handleRunMissionForCurrentProject = async () => {
    if (!currentProject) return;
    setStatus("planning");
    setLlmResponse(null);
    try {
      const defaultPrompt = "Perform a full senior engineering review of this codebase.";
      const newMission = await runMission(
        defaultPrompt,
        "architect",
        currentProject._id,
        "Senior Engineering Review",
      );

      if (newMission && newMission._id) {
        navigate({ to: "/repositories" });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error(error);
      setLlmResponse("Error: Could not process repository.");
      setStatus("idle");
      alert(
        "Failed to connect to the AI Engine. Please ensure the Python backend is running on port 8000.",
      );
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) navigate({ to: "/login" });
  }, [navigate]);

  const statusCopy = {
    idle: [
      "Ready",
      currentProject
        ? "Review the latest missions and recommendations for your project."
        : "Upload your repository and get a Senior Engineer's review in minutes.",
    ],
    planning: [
      "Analyzing Architecture",
      "Your AI Mentor is reviewing the codebase for missing features, security, and performance.",
    ],
    "awaiting-approval": ["Review Complete", "Your Project Review Report and Roadmap are ready."],
    implementing: ["Finalizing Roadmap", "Mentor is generating the learning roadmap."],
    complete: ["Mission complete", "The review report has been saved."],
  }[status] || ["Ready", "Upload your repository and get a Senior Engineer's review in minutes."];

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
              {currentProject
                ? `Dashboard / ${currentProject.name}`
                : "Sarathi.ai / Engineering Mentor"}
            </p>
            {currentProject ? (
              <>
                <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
                  Project <span className="text-iridescent pb-2 pr-2">Overview.</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                  View your active missions, architectural recommendations, and repository
                  intelligence below.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-display text-4xl md:text-5xl mt-2 mb-4">
                  From student project to{" "}
                  <span className="text-iridescent pb-2 pr-2">production-ready.</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Get an instant Senior Engineer review of your repository. Discover missing
                  features, security vulnerabilities, and get a week-by-week implementation roadmap.
                </p>
              </>
            )}
          </div>
          <Link
            to="/import"
            className="rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition flex items-center gap-2 w-max"
          >
            <Plus className="size-4" /> Import repository
          </Link>
        </header>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
          <section className="space-y-8">
            <div className="glass rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <label className="text-sm font-medium text-fuchsia-300 mb-3 block">
                  Enter GitHub Repository URL
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    placeholder="e.g. https://github.com/expressjs/express"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-lg outline-none focus:border-fuchsia-300/60 placeholder:text-white/30 pr-40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && mission.trim() && status !== "planning") {
                        handleRunMission();
                      }
                    }}
                  />
                  <button
                    onClick={handleRunMission}
                    disabled={status === "planning" || !mission}
                    className="absolute right-2 top-2 bottom-2 bg-foreground text-background px-4 md:px-6 rounded-xl font-medium flex items-center gap-2 hover:bg-foreground/90 transition-colors disabled:opacity-50"
                  >
                    {status === "planning" ? (
                      <Loader2 className="animate-spin size-4" />
                    ) : (
                      "Review My Project"
                    )}
                    {status !== "planning" && <ArrowRight className="size-4" />}
                  </button>
                </div>
                <div className="mt-6">
                  <MissionProgress status={status} />
                </div>
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
                  {missions.length > 0 && missions[0].score ? (
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                        Score
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-lg font-bold border border-white/10 bg-white/5"
                        style={{
                          background: "var(--grad-iridescent)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {missions[0].score}/100
                      </span>
                    </div>
                  ) : (
                    <ShieldCheck className="size-6 text-cyan-300" />
                  )}
                </div>
                {llmResponse ? (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-sm whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto">
                    {llmResponse}
                  </div>
                ) : (
                  <ol className="space-y-3">
                    {(missions.length > 0 && missions[0].suggestions?.length > 0
                      ? missions[0].suggestions.slice(0, 4).map((s) => s.title)
                      : [
                          "Scanning repository context and boundaries",
                          "Analyzing security policies and auth flows",
                          "Evaluating performance and database queries",
                          "Synthesizing architectural recommendations",
                        ]
                    ).map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm">
                        <span className="grid place-items-center shrink-0 size-5 rounded-full bg-white/10 text-xs">
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
                {status === "idle" ? (
                  <div className="mt-8 text-center text-sm text-muted-foreground p-6 rounded-xl border border-white/5 bg-white/5">
                    {missions.length === 0 ? (
                      <>
                        <p className="mb-4">
                          Start a project review to see your repository score, missing features, and
                          learning roadmap here.
                        </p>
                        {currentProject && (
                          <button
                            onClick={handleRunMissionForCurrentProject}
                            className="bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
                          >
                            <Bot className="size-4" /> Run Senior Engineer Review
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="mb-4">Want an updated analysis of your codebase?</p>
                        {currentProject && (
                          <button
                            onClick={handleRunMissionForCurrentProject}
                            className="bg-foreground text-background px-6 py-2.5 rounded-full font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
                          >
                            <Bot className="size-4" /> Run New Review
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mt-8 p-6 rounded-xl border border-white/5 bg-white/5">
                    <p className="text-sm font-medium mb-4">Mission Progress</p>
                    <MissionProgress status={status} />
                  </div>
                )}
                {status === "awaiting-approval" && (
                  <div className="mt-6 space-y-3 border-t border-border pt-5">
                    <p className="text-sm font-medium">Have feedback for the Review?</p>
                    <div className="flex gap-2">
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
                      style={{ background: "var(--grad-iridescent)" }}
                      className="w-full rounded-xl text-white py-3 text-sm font-semibold hover:opacity-90 transition mt-2"
                    >
                      Approve & Generate Report
                    </button>
                  </div>
                )}
                {status === "implementing" && (
                  <button
                    onClick={() => setStatus("complete")}
                    style={{ background: "var(--grad-iridescent)" }}
                    className="mt-6 w-full rounded-xl text-white py-3 text-sm font-semibold hover:opacity-90 transition"
                  >
                    Mark report complete
                  </button>
                )}
                {status === "complete" && (
                  <div className="mt-6 rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300 flex items-center gap-2">
                    <Check className="size-4" /> Ready to present final architecture report
                  </div>
                )}
              </div>

              <div className="glass rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Mission Control
                    </p>
                    <h2 className="font-display text-2xl mt-1">Active Missions</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {missions.length === 0 ? (
                    <div className="p-6 text-center text-sm text-muted-foreground border border-white/5 rounded-xl bg-white/5">
                      No active missions. Import a repository and create a mock mission via API to
                      see them here!
                    </div>
                  ) : (
                    missions.map((m) => (
                      <div
                        key={m._id}
                        className="rounded-xl bg-black/20 border border-white/10 p-5 flex flex-col gap-4 transition hover:bg-black/40"
                      >
                        <div>
                          <h3
                            className="font-semibold text-white leading-snug line-clamp-2"
                            title={m.title}
                          >
                            {m.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {m.suggestions.length} architectural suggestion
                              {m.suggestions.length !== 1 ? "s" : ""}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider whitespace-nowrap ${
                                m.status === "review_required"
                                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                  : m.status === "approved"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : m.status === "rejected"
                                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                      : "bg-white/10 text-white/70 border border-white/20"
                              }`}
                            >
                              {m.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <Link
                          to="/missions/$missionId"
                          params={{ missionId: m._id }}
                          className="w-full sm:w-max text-sm flex items-center justify-center gap-1 hover:text-fuchsia-300 transition-colors bg-white/5 px-4 py-2.5 rounded-lg hover:bg-white/10"
                        >
                          View details <ChevronRight className="size-4" />
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Analysis Pipeline
                  </p>
                  <h2 className="font-display text-2xl mt-1 mb-5">Mentorship Capabilities</h2>
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
                {(currentProject
                  ? [
                      currentProject.language || "TypeScript",
                      currentProject.framework || "Node.js",
                      "API",
                      "Database",
                    ]
                  : ["Authentication", "Payments", "Orders"]
                ).map((tag) => (
                  <span
                    className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-border text-sm text-muted-foreground flex items-center gap-2">
                <GitBranch className="size-4 text-cyan-300" />{" "}
                {currentProject
                  ? currentProject.githubUrl.replace("https://github.com/", "")
                  : "No project active"}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function MissionProgress({ status }: { status: MissionStatus }) {
  const steps = ["Context", "Scan", "Analyze", "Evaluate", "Architect", "Review", "Finalize"];
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
function AgentEvent({ name, detail, icon: Icon, color }: (typeof agents)[number]) {
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
          </div>
          <p className="text-xs text-muted-foreground mt-1">✓ {detail}</p>
        </div>
      </div>
    </div>
  );
}
