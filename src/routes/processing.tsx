import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/processing")({
  component: ProcessingRepo,
});

const pipelineSteps = [
  "Uploading Repository",
  "Parsing Files & Directories",
  "Identifying Frameworks & Languages",
  "Finding Components & UI Patterns",
  "Extracting API Routes & Endpoints",
  "Finding Database Models & Schemas",
  "Building Knowledge Graph",
  "Generating Vector Embeddings",
  "Repository Ready"
];

function ProcessingRepo() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= pipelineSteps.length - 1) return;
    
    // Simulate pipeline progression
    const timer = setTimeout(() => {
      setCurrentStep(s => s + 1);
    }, Math.random() * 1500 + 800); // Random delay between 0.8s and 2.3s
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  const isComplete = currentStep === pipelineSteps.length - 1;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1] 
        }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-xl p-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl glass mb-6 relative">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-3xl border border-transparent bg-[linear-gradient(90deg,var(--color-fuchsia-400),var(--color-cyan-400))] opacity-20 [mask-image:linear-gradient(white,transparent)]"
            />
            {isComplete ? (
              <CheckCircle2 className="size-10 text-emerald-400" />
            ) : (
              <Loader2 className="size-10 text-fuchsia-400 animate-spin" />
            )}
          </div>
          
          <h1 className="font-display text-4xl mb-3">
            {isComplete ? "Analysis Complete" : "Processing Repository"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isComplete ? "Your knowledge graph and vector embeddings are ready." : "Please wait while CodePilot AI ingests your codebase..."}
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="glass rounded-3xl p-8 border border-border shadow-2xl relative overflow-hidden">
          {/* Progress Line */}
          <div className="absolute left-10 top-12 bottom-12 w-px bg-border" />
          
          <div className="space-y-6 relative">
            {pipelineSteps.map((step, index) => {
              const status = index < currentStep ? 'done' : index === currentStep ? 'active' : 'pending';
              
              return (
                <div key={step} className="flex items-center gap-4">
                  <div className={`relative z-10 size-5 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    status === 'done' ? 'bg-emerald-400 text-background' : 
                    status === 'active' ? 'bg-fuchsia-400 text-background animate-pulse' : 
                    'bg-background border border-border text-transparent'
                  }`}>
                    {status === 'done' && <CheckCircle2 className="size-3" />}
                  </div>
                  
                  <span className={`text-sm transition-colors duration-500 ${
                    status === 'done' ? 'text-muted-foreground' : 
                    status === 'active' ? 'text-foreground font-medium' : 
                    'text-muted-foreground/40'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 10, pointerEvents: isComplete ? "auto" : "none" }}
          className="mt-10 flex justify-center"
        >
          <Link to="/workspace/$repoId" params={{ repoId: "demo-repo" }} className="rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium hover:opacity-90 transition flex items-center gap-2">
            Enter Workspace <ArrowRight className="size-4" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
