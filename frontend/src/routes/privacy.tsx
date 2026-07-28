import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/privacy")({
  component: () => (
    <ProjectContextPage
      title="Privacy Policy"
      description="Standard privacy practices apply. No actual user data is maliciously collected in this demo."
    />
  ),
});
