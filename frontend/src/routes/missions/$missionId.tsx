import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { getMissionById, updateMissionStatus, Mission } from "@/lib/api";
import { ArrowLeft, CheckCircle2, XCircle, ShieldCheck, Zap, Layers, Lightbulb, Check, X, Code2, TestTube2, Clock, GitPullRequest, Timer } from "lucide-react";

export const Route = createFileRoute("/missions/$missionId")({
  component: MissionControlCenter,
});

function MissionControlCenter() {
  const { missionId } = Route.useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getMissionById(missionId)
      .then((data) => {
        setMission(data);
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
        <Link to="/dashboard" className="text-fuchsia-300 hover:underline">Return to Dashboard</Link>
      </main>
    );
  }

  const isPending = mission.status === "review_required" || mission.status === "pending" || mission.status === "in_progress";

  return (
    <main className="min-h-screen bg-background text-foreground flex">
      <div className="absolute inset-0 noise pointer-events-none" />
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative z-10 flex-1 min-w-0 overflow-y-auto p-5 md:p-10">
        <header className="max-w-5xl mx-auto mb-8">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-foreground transition flex items-center gap-2 text-sm font-medium mb-8 w-max"
          >
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-fuchsia-300 mb-2">
                Project Review Report
              </p>
              <h1 className="font-display text-3xl md:text-4xl">{mission.title}</h1>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {mission.description}
              </p>
            </div>
            
            <div className="glass p-5 rounded-2xl flex flex-col gap-4 min-w-[240px] shrink-0 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
                <span className="px-3 py-1 rounded-full text-lg font-bold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  {mission.score || 0}/100
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  mission.status === 'review_required' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                  mission.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  mission.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  'bg-white/10 text-white/70 border border-white/20'
                }`}>
                  {mission.status.replace('_', ' ')}
                </span>
              </div>
              
              {isPending && (
                <div className="grid grid-cols-2 gap-2 mt-2">
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
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="size-5 text-fuchsia-300" />
              <h2 className="font-display text-2xl">Missing Features & Architecture Flaws</h2>
            </div>
            
            {mission.suggestions?.length === 0 ? (
              <p className="text-muted-foreground text-sm">No suggestions found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mission.suggestions?.map((suggestion, idx) => {
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
                  if (suggestion.impact === "High") impactColor = "text-red-400 bg-red-500/10 border-red-500/20";
                  if (suggestion.impact === "Medium") impactColor = "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
                  if (suggestion.impact === "Low") impactColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

                  return (
                    <div key={idx} className="rounded-2xl border border-white/10 overflow-hidden bg-black/20 p-6 flex flex-col hover:bg-black/40 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className={`p-3 rounded-xl border ${bgClass} ${borderClass} ${colorClass}`}>
                          <Icon className="size-6" />
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${impactColor}`}>
                          {suggestion.impact} IMPACT
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-white mb-2">{suggestion.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {suggestion.description}
                      </p>
                      
                      {suggestion.why && (
                        <div className="mt-4 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                          <span className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1 block">Why is this important?</span>
                          <p className="text-sm text-red-200/70">{suggestion.why}</p>
                        </div>
                      )}

                      {suggestion.recommendation && (
                        <div className="mt-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 block">Recommendation</span>
                          <p className="text-sm text-emerald-200/70">{suggestion.recommendation}</p>
                        </div>
                      )}
                      
                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                         <span className={`text-xs font-medium px-2 py-1 rounded bg-white/5 ${colorClass}`}>
                           {suggestion.category}
                         </span>
                         <div className="flex gap-3 text-xs text-muted-foreground">
                           {suggestion.difficulty && (
                             <span className="flex items-center gap-1"><GitPullRequest className="size-3" /> {suggestion.difficulty}</span>
                           )}
                           {suggestion.estimatedTime && (
                             <span className="flex items-center gap-1"><Timer className="size-3" /> {suggestion.estimatedTime}</span>
                           )}
                         </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {mission.roadmap && mission.roadmap.length > 0 && (
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="size-5 text-fuchsia-300" />
                <h2 className="font-display text-2xl">Implementation Roadmap</h2>
              </div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {mission.roadmap.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/50 text-fuchsia-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_15px_rgba(232,121,249,0.15)]">
                      <span className="text-sm font-bold">{idx + 1}</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-2xl border border-white/5">
                      <span className="text-xs font-bold tracking-widest uppercase text-fuchsia-400 mb-1 block">{step.week}</span>
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
