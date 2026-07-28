import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/terms")({
  component: () => (
    <ProjectContextPage
      title="Terms of Service"
      description="By using this demo, you agree that this is a student project provided as-is."
    />
  ),
});
