import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/api")({
  component: () => <ProjectContextPage title="API Reference" description="Explore the mocked API documentation for the Sarathi.ai engine." />
});
