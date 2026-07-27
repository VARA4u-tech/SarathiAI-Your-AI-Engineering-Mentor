import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { getMissionById, updateMissionStatus, Mission } from "@/lib/api";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  FileCode2,
  GitBranch,
  ShieldCheck,
  Check,
  X
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
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-2">
                Mission Overview
              </p>
              <h1 className="font-display text-3xl md:text-4xl">{mission.title}</h1>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {mission.description}
              </p>
            </div>
            
            <div className="glass p-5 rounded-2xl flex flex-col gap-4 min-w-[240px] shrink-0 border border-white/10">
              <div className="flex items-center justify-between">
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
              <GitBranch className="size-5 text-fuchsia-300" />
              <h2 className="font-display text-2xl">Proposed Changes</h2>
            </div>
            
            {mission.changes.length === 0 ? (
              <p className="text-muted-foreground text-sm">No file changes proposed.</p>
            ) : (
              <div className="space-y-6">
                {mission.changes.map((change, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                    <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="size-4 text-cyan-300" />
                        <span className="font-mono text-sm text-foreground/90">{change.file}</span>
                      </div>
                      <div className="text-xs font-mono">
                        <span className="text-emerald-400">+{change.additions}</span>
                        {" / "}
                        <span className="text-red-400">-{change.deletions}</span>
                      </div>
                    </div>
                    <div className="p-4 overflow-x-auto custom-scrollbar">
                      <pre className="text-sm font-mono leading-relaxed">
                        {change.diff.split('\n').map((line, lineIdx) => {
                          let colorClass = "text-muted-foreground";
                          let bgClass = "";
                          
                          if (line.startsWith('+')) {
                            colorClass = "text-emerald-300";
                            bgClass = "bg-emerald-500/10";
                          } else if (line.startsWith('-')) {
                            colorClass = "text-red-300 line-through decoration-red-500/50";
                            bgClass = "bg-red-500/10";
                          } else if (line.startsWith('@@')) {
                            colorClass = "text-cyan-400 opacity-70";
                          }

                          return (
                            <div key={lineIdx} className={`px-2 py-0.5 rounded flex ${bgClass}`}>
                              <span className={`w-8 shrink-0 select-none opacity-40 font-mono text-xs pt-0.5 ${colorClass}`}>
                                {lineIdx + 1}
                              </span>
                              <span className={`${colorClass} whitespace-pre`}>
                                {line}
                              </span>
                            </div>
                          );
                        })}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
