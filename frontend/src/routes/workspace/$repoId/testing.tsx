import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  TestTube2,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  TerminalSquare,
  FileCode2,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/workspace/$repoId/testing")({
  component: TestingCenter,
});

function TestingCenter() {
  const { repoId } = useParams({ from: "/workspace/$repoId/testing" });

  return (
    <main className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 h-16 border-b border-border flex items-center justify-between px-6 glass shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/workspace/$repoId"
            params={{ repoId }}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <ArrowRight className="size-5 rotate-180" />
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-display text-xl flex items-center gap-2">
            <TestTube2 className="size-5 text-emerald-400" />
            Testing Center
          </span>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:opacity-90 transition">
          <PlayCircle className="size-4" /> Run All Tests
        </button>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 border border-border">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Total Coverage
              </h3>
              <div className="font-display text-5xl text-emerald-400 mb-2">84%</div>
              <p className="text-sm text-muted-foreground">+2.4% since last generation</p>
              <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden mt-6">
                <div className="h-full w-[84%] bg-emerald-400" />
              </div>
            </div>

            <div className="md:col-span-2 glass rounded-3xl p-6 border border-border">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                AI Test Generator
              </h3>
              <div className="flex gap-4">
                <div className="flex-1 bg-background/50 border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">OrderService.ts</span>
                    <span className="text-xs bg-orange-400/10 text-orange-400 px-2 py-0.5 rounded">
                      Low Coverage (42%)
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Missing edge cases for concurrent refunds and invalid coupon codes.
                  </p>
                  <button className="w-full rounded-lg glass border border-border py-2 text-xs font-medium hover:bg-foreground/5 transition flex justify-center items-center gap-2">
                    <TestTube2 className="size-3" /> Generate Edge Cases
                  </button>
                </div>

                <div className="flex-1 bg-background/50 border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">PaymentWebhook.ts</span>
                    <span className="text-xs bg-fuchsia-400/10 text-fuchsia-400 px-2 py-0.5 rounded">
                      Uncovered
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Missing integration tests for Stripe webhook signature validation.
                  </p>
                  <button className="w-full rounded-lg glass border border-border py-2 text-xs font-medium hover:bg-foreground/5 transition flex justify-center items-center gap-2">
                    <TestTube2 className="size-3" /> Generate Integration Tests
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl mb-4">Generated Test Suites</h2>
            <div className="space-y-4">
              <TestSuite
                name="auth.service.spec.ts"
                tests={42}
                passed={42}
                time="1.2s"
                type="Unit"
              />
              <TestSuite
                name="checkout.integration.spec.ts"
                tests={18}
                passed={18}
                time="4.5s"
                type="Integration"
              />
              <TestSuite
                name="user.routes.spec.ts"
                tests={24}
                passed={23}
                time="2.1s"
                type="API"
                failed={1}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TestSuite({
  name,
  tests,
  passed,
  failed = 0,
  time,
  type,
}: {
  name: string;
  tests: number;
  passed: number;
  failed?: number;
  time: string;
  type: string;
}) {
  const allPassed = failed === 0;

  return (
    <div className="glass rounded-2xl p-4 border border-border flex items-center justify-between transition hover:border-foreground/30">
      <div className="flex items-center gap-4">
        <div
          className={`size-10 rounded-xl flex items-center justify-center ${allPassed ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}
        >
          {allPassed ? <CheckCircle2 className="size-5" /> : <TestTube2 className="size-5" />}
        </div>
        <div>
          <h4 className="text-sm font-medium flex items-center gap-2">
            {name}
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded">
              {type}
            </span>
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {tests} tests • {passed} passed {failed > 0 && `• ${failed} failed`} • {time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-foreground/5 tooltip-trigger">
          <TerminalSquare className="size-4" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-foreground/5 tooltip-trigger">
          <FileCode2 className="size-4" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-foreground/5 tooltip-trigger">
          <Download className="size-4" />
        </button>
      </div>
    </div>
  );
}
