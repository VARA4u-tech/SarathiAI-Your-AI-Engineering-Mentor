import { createFileRoute } from "@tanstack/react-router";
import { AuthExperience } from "@/components/auth/AuthExperience";
export const Route = createFileRoute("/signup")({
  component: () => <AuthExperience mode="signup" />,
});
