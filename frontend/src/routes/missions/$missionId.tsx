import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { getMissionById, updateMissionStatus, deleteMission, Mission } from "@/lib/api";
import {
  ArrowLeft,
  ShieldCheck,
  Layers,
  Lightbulb,
  Check,
  X,
  Code2,
  TestTube2,
  Clock,
  GitPullRequest,
  Timer,
  Zap,
  BookOpen,
  TrendingUp,
  Wrench,
  Trash2,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/missions/$missionId")({
  component: MissionControlCenter,
});

function MissionControlCenter() {
  const { missionId } = Route.useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    getMissionById(missionId)
      .then((data) => {
        setMission(data);
        const pid = typeof data.projectId === "object" ? data.projectId._id : data.projectId;
        if (pid) localStorage.setItem("activeProjectId", String(pid));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load mission:", err);
        setLoading(false);
      });
  }, [missionId]);

  const handleApprove = async () => {
    if (!mission) return;
    try {
      const updated = await updateMissionStatus(mission._id, "approved");
      setMission(updated);
    } catch (err) {
      console.error("Failed to approve mission:", err);
    }
  };

  const handleReject = async () => {
    if (!mission) return;
    try {
      const updated = await updateMissionStatus(mission._id, "rejected");
      setMission(updated);
    } catch (err) {
      console.error("Failed to reject mission:", err);
    }
  };

  const handleDelete = async () => {
    if (!mission) return;
    if (!window.confirm("Delete this review permanently?")) return;
    try {
      await deleteMission(mission._id);
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error("Failed to delete mission:", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading mission details...</p>
      </main>
    );
  }

  if (!mission) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Mission not found</p>
        <Link to="/dashboard" className="text-fuchsia-300 hover:underline">
          Return to Dashboard
        </Link>
      </main>
    );
  }

  const isPending =
    mission.status === "review_required" ||
    mission.status === "pending" ||
    mission.status === "in_progress";

  return (
    <main className="min-h-screen bg-background text-foreground flex print:block">
      <div className="absolute inset-0 noise pointer-events-none print:hidden" />
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 min-w-0 overflow-y-auto print:overflow-visible p-5 md:p-10 print:p-0">
        <header className="max-w-5xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-8 print:hidden">
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-foreground transition flex items-center gap-2 text-sm font-medium w-max"
            >
              <ArrowLeft className="size-4" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 border border-white/10 hover:border-white/20"
                title="Download Report as PDF"
              >
                <Download className="size-3.5" /> Download PDF
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 text-xs text-red-400/60 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                title="Delete this review"
              >
                <Trash2 className="size-3.5" /> Delete review
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-300 mb-2">
                Project Review Report
              </p>
              <h1 className="font-display text-3xl md:text-4xl line-clamp-3" title={typeof mission.projectId === 'object' ? mission.projectId.name : mission.title}>
                {typeof mission.projectId === 'object' ? mission.projectId.name : mission.title}
              </h1>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                <span className="text-white font-medium">{mission.title}</span> — {mission.description}
              </p>
            </div>

            <div className="glass p-5 rounded-2xl flex flex-col gap-4 min-w-[280px] shrink-0 border border-white/10">
              {/* Overall Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
                <span
                  className="px-3 py-1 rounded-full text-lg font-bold"
                  style={{
                    background: "var(--grad-iridescent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {mission.score || 0}/100
                </span>
              </div>

              {/* Score bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${mission.score || 0}%`, background: "var(--grad-iridescent)" }}
                />
              </div>

              {/* Category sub-scores */}
              {mission.categoryScores && (
                <div className="space-y-2.5 border-t border-white/10 pt-3">
                  {(
                    [
                      { key: "Architecture", color: "bg-cyan-400" },
                      { key: "Security", color: "bg-red-400" },
                      { key: "Performance", color: "bg-yellow-400" },
                      { key: "Testing", color: "bg-emerald-400" },
                      { key: "Scalability", color: "bg-violet-400" },
                      { key: "Maintainability", color: "bg-fuchsia-400" },
                    ] as const
                  ).map(({ key, color }) => {
                    const val = (mission.categoryScores as Record<string, number>)[key] ?? 0;
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-[11px] text-muted-foreground w-28 shrink-0">
                          {key}
                        </span>
                        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${color}`}
                            style={{ width: `${val * 10}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-white/60 w-6 text-right">{val}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Status + Actions */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    mission.status === "review_required"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      : mission.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : mission.status === "rejected"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-white/10 text-white/70 border border-white/20"
                  }`}
                >
                  {mission.status.replace("_", " ")}
                </span>
              </div>

              {isPending && (
                <div className="grid grid-cols-2 gap-2 print:hidden">
                  <button
                    onClick={handleReject}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                  >
                    <X className="size-4" /> Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-sm font-medium"
                  >
                    <Check className="size-4" /> Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/10 print:hidden">
            {[
              "All",
              "System Design & Architecture",
              "Full Stack Implementation",
              "Vulnerability & Compliance",
              "Testing & Validation",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {tab === "All" ? "Overview" : tab}
              </button>
            ))}
          </div>

          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="size-5 text-fuchsia-300" />
              <h2 className="font-display text-2xl">Missing Features & Architecture Flaws</h2>
            </div>

            {mission.suggestions?.length === 0 ? (
              <p className="text-muted-foreground text-sm">No suggestions found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mission.suggestions
                  ?.filter((suggestion) => activeTab === "All" || suggestion.category === activeTab)
                  .map((suggestion, idx) => {
                    let Icon = Lightbulb;
                    let colorClass = "text-fuchsia-300";
                    let bgClass = "bg-fuchsia-500/10";
                    let borderClass = "border-fuchsia-500/20";

                    if (suggestion.category === "Vulnerability & Compliance") {
                      Icon = ShieldCheck;
                      colorClass = "text-emerald-400";
                      bgClass = "bg-emerald-500/10";
                      borderClass = "border-emerald-500/20";
                    } else if (suggestion.category === "Testing & Validation") {
                      Icon = TestTube2;
                      colorClass = "text-yellow-400";
                      bgClass = "bg-yellow-500/10";
                      borderClass = "border-yellow-500/20";
                    } else if (suggestion.category === "System Design & Architecture") {
                      Icon = Layers;
                      colorClass = "text-cyan-400";
                      bgClass = "bg-cyan-500/10";
                      borderClass = "border-cyan-500/20";
                    } else if (suggestion.category === "Full Stack Implementation") {
                      Icon = Code2;
                      colorClass = "text-fuchsia-400";
                      bgClass = "bg-fuchsia-500/10";
                      borderClass = "border-fuchsia-500/20";
                    }

                    let impactColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
                    if (suggestion.impact === "High")
                      impactColor = "text-red-400 bg-red-500/10 border-red-500/20";
                    if (suggestion.impact === "Medium")
                      impactColor = "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
                    if (suggestion.impact === "Low")
                      impactColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/10 overflow-hidden bg-black/20 p-6 flex flex-col hover:bg-black/40 transition-colors print:break-inside-avoid"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div
                            className={`p-3 rounded-xl border ${bgClass} ${borderClass} ${colorClass}`}
                          >
                            <Icon className="size-6" />
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${impactColor}`}
                          >
                            {suggestion.impact} IMPACT
                          </span>
                        </div>

                        <h3 className="font-semibold text-lg text-white mb-2">
                          {suggestion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {suggestion.description}
                        </p>

                        {suggestion.why && (
                          <div className="mt-4 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1 block">
                              Why is this important?
                            </span>
                            <p className="text-sm text-red-200/70">{suggestion.why}</p>
                          </div>
                        )}

                        {suggestion.recommendation && (
                          <div className="mt-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 block">
                              Recommendation
                            </span>
                            <p className="text-sm text-emerald-200/70">
                              {suggestion.recommendation}
                            </p>
                          </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded bg-white/5 ${colorClass}`}
                          >
                            {suggestion.category}
                          </span>
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            {suggestion.difficulty && (
                              <span className="flex items-center gap-1">
                                <GitPullRequest className="size-3" /> {suggestion.difficulty}
                              </span>
                            )}
                            {suggestion.estimatedTime && (
                              <span className="flex items-center gap-1">
                                <Timer className="size-3" /> {suggestion.estimatedTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <RoadmapSection roadmap={mission.roadmap} suggestions={mission.suggestions} />
        </div>
      </div>
    </main>
  );
}

// ─── Roadmap Section ────────────────────────────────────────────────────────

type RoadmapStep = { week: string; title: string; description: string };
type Suggestion = { title: string; impact: string; category: string; estimatedTime?: string };

const CATEGORY_COLORS: Record<string, string> = {
  "System Design & Architecture": "border-cyan-500/30 bg-cyan-500/5",
  "Full Stack Implementation": "border-fuchsia-500/30 bg-fuchsia-500/5",
  "Vulnerability & Compliance": "border-red-500/30 bg-red-500/5",
  "Testing & Validation": "border-yellow-500/30 bg-yellow-500/5",
};

const WEEK_LABEL_COLOR = [
  "text-cyan-400",
  "text-fuchsia-400",
  "text-yellow-400",
  "text-emerald-400",
  "text-red-400",
  "text-violet-400",
  "text-blue-400",
  "text-orange-400",
];

function RoadmapSection({
  roadmap,
  suggestions,
}: {
  roadmap: RoadmapStep[];
  suggestions: Suggestion[];
}) {
  // Use real roadmap if available, otherwise auto-generate from High then Medium impact suggestions
  const steps: RoadmapStep[] =
    roadmap && roadmap.length > 0
      ? roadmap.map(step => ({ ...step, week: step.week.replace(/Week/gi, 'Day') }))
      : [...suggestions]
          .sort((a, b) => {
            const order = { High: 0, Medium: 1, Low: 2 };
            return (
              (order[a.impact as keyof typeof order] ?? 3) -
              (order[b.impact as keyof typeof order] ?? 3)
            );
          })
          .slice(0, 8)
          .map((s, i) => ({
            week: `Day ${i + 1}`,
            title: s.title,
            description: `Implement "${s.title}". Category: ${s.category}. Estimated time: ${s.estimatedTime || "Varies"}.`,
          }));

  if (!steps.length) return null;

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="size-5 text-fuchsia-300" />
        <div>
          <h2 className="font-display text-2xl">Implementation Roadmap</h2>
          {!(roadmap && roadmap.length > 0) && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Auto-generated from analysis — approve the report to confirm
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl border p-5 flex flex-col gap-2 transition-colors hover:bg-white/5 print:break-inside-avoid ${
              CATEGORY_COLORS[suggestions[idx]?.category ?? ""] || "border-white/10 bg-white/5"
            }`}
          >
            {/* Week badge */}
            <span
              className={`text-[10px] font-extrabold tracking-[0.2em] uppercase ${WEEK_LABEL_COLOR[idx % WEEK_LABEL_COLOR.length]}`}
            >
              {step.week}
            </span>

            {/* Timeline dot */}
            <div className="absolute -top-3 left-5 size-6 rounded-full border border-white/10 bg-background flex items-center justify-center">
              <span className="text-[10px] font-bold text-fuchsia-400">{idx + 1}</span>
            </div>

            <h3 className="font-semibold text-white text-sm leading-snug mt-1">{step.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">
              {step.description}
            </p>

            {suggestions[idx]?.estimatedTime && (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                <Timer className="size-3" /> {suggestions[idx].estimatedTime}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
