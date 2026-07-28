import { createFileRoute } from "@tanstack/react-router";
import { ProjectContextPage } from "@/components/site/ProjectContextPage";

export const Route = createFileRoute("/contact")({
  component: () => (
    <ProjectContextPage
      title="Contact"
      description="Get in touch with the developer behind Sarathi.ai."
    />
  ),
});
