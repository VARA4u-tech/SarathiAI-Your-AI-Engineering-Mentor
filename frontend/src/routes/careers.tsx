import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/careers")({
  component: () => (
    <ProjectContextPage
      title="Careers"
      description="I am currently looking for full-time opportunities! Check out my resume."
    />
  ),
});
