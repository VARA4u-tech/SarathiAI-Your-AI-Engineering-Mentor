import { createFileRoute } from "@tanstack/react-router";
import { AuthExperience } from "@/components/auth/AuthExperience";
export const Route = createFileRoute("/login")({
  component: () => <AuthExperience mode="login" />,
});
