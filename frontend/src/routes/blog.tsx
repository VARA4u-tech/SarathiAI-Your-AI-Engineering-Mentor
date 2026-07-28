import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/blog")({
  component: () => <ProjectContextPage title="Blog" description="Read about the engineering challenges faced while building this AI OS." />
});
