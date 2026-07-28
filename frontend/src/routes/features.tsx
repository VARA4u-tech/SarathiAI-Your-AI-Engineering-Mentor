import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/features")({
  component: () => (
    <ProjectContextPage
      title="Features"
      description="Explore the powerful features of Sarathi.ai, built as a showcase for this hackathon."
    />
  ),
});
