import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/pricing")({
  component: () => (
    <ProjectContextPage
      title="Pricing"
      description="Since this is a student hackathon project, Sarathi.ai is 100% free and open-source!"
    />
  ),
});
