import { createFileRoute } from "@tanstack/react-router";
import { AuthExperience } from "@/components/auth/AuthExperience";
export const Route = createFileRoute("/reset-password")({
  component: () => <AuthExperience mode="reset" />,
});
