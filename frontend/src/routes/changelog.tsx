import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/changelog")({
  component: () => <ProjectContextPage title="Changelog" description="Track the rapid development of this project during the hackathon timeline." />
});
