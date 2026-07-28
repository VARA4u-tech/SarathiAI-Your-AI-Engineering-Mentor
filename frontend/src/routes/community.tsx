import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/community")({
  component: () => (
    <ProjectContextPage
      title="Community"
      description="Join the discussion around this open-source resume project."
    />
  ),
});
