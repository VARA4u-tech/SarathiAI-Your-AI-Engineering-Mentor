import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProjects, getMissions, deleteProject, Project, Mission } from "@/lib/api";
import {
  Menu,
  GitBranch,
  FolderGit2,
  Loader2,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export const Route = createFileRoute("/repositories")({
  component: RepositoriesPage,
});

function RepositoriesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [missionsByProject, setMissionsByProject] = useState<Record<string, Mission[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(async (data) => {
        setProjects(data);
        // Load missions for each project
        const map: Record<string, Mission[]> = {};
        await Promise.all(
          data.map(async (p: Project) => {
            try {
              const m = await getMissions(p._id);
              map[p._id] = m;
            } catch {
              map[p._id] = [];
            }
          }),
        );
        setMissionsByProject(map);
      })
      .catch((err) => console.error("Failed to load projects", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this repository?")) return;
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project");
    }
  };

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
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </button>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300 mb-2">
              Repository Intelligence
            </p>
            <h1 className="font-display text-4xl md:text-5xl">Codebases</h1>
            <p className="text-muted-foreground mt-2">
              All imported repositories and their review history.
            </p>
          </div>
          <Link
            to="/import"
            className="rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition flex items-center gap-2 w-max border border-white/10"
          >
            <Plus className="size-4" /> Import repository
          </Link>
        </header>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const missions = missionsByProject[project._id] ?? [];
                const latestMission = missions[0] ?? null;
                const score = latestMission?.score ?? null;

                return (
                  <div
                    key={project._id}
                    className="glass rounded-3xl p-6 group hover:bg-white/5 transition-colors flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="size-12 rounded-2xl flex items-center justify-center bg-fuchsia-500/10 border border-fuchsia-500/20">
                        <FolderGit2 className="size-6 text-fuchsia-300" />
                      </div>
                      {score !== null ? (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{
                            background: "var(--grad-iridescent)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {score}/100
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-white/5 border border-white/10">
                          Not reviewed
                        </span>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, project._id)}
                        className="ml-2 text-muted-foreground hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition"
                        title="Delete Repository"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    {/* Name */}
                    <h2 className="font-display text-xl mb-1 truncate">{project.name}</h2>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 truncate flex items-center gap-1 mb-4"
                    >
                      <GitBranch className="size-3 shrink-0" />
                      {project.githubUrl.replace("https://github.com/", "")}
                    </a>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.language && (
                        <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
                          {project.language}
                        </span>
                      )}
                      {project.framework && (
                        <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
                          {project.framework}
                        </span>
                      )}
                    </div>

                    {/* Mission stats */}
                    <div className="border-t border-white/10 pt-4 mt-auto space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Reviews</span>
                        <span className="font-medium">{missions.length}</span>
                      </div>
                      {latestMission && (
                        <div className="flex items-center gap-2 text-xs">
                          {latestMission.status === "approved" ? (
                            <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                          ) : latestMission.status === "rejected" ? (
                            <AlertCircle className="size-3 text-red-400 shrink-0" />
                          ) : (
                            <Clock className="size-3 text-yellow-400 shrink-0" />
                          )}
                          <span className="text-muted-foreground truncate">
                            Latest: {latestMission.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    {latestMission ? (
                      <Link
                        to="/missions/$missionId"
                        params={{ missionId: latestMission._id }}
                        className="mt-4 w-full flex items-center justify-center gap-1 text-sm py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
                      >
                        View latest report <ChevronRight className="size-4" />
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => {
                          localStorage.setItem("activeProjectId", project._id);
                          localStorage.setItem("importedRepo", project.githubUrl);
                        }}
                        className="mt-4 w-full flex items-center justify-center gap-1 text-sm py-2.5 rounded-xl border border-dashed border-white/10 hover:border-fuchsia-500/30 transition-colors text-muted-foreground hover:text-fuchsia-300"
                      >
                        <Plus className="size-4" /> Run first review
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="size-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <FolderGit2 className="size-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl mb-2">No repositories yet</h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-8">
        Import a GitHub repository to get your first AI Engineering Mentor review.
      </p>
      <Link
        to="/import"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition hover:opacity-90"
        style={{ background: "var(--grad-iridescent)" }}
      >
        <Plus className="size-4" /> Import your first repo
      </Link>
    </div>
  );
}
