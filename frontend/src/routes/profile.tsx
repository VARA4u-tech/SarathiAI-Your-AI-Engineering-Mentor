import { createFileRoute, redirect } from "@tanstack/react-router";

// We removed the profile page, but we keep this file to prevent TanStack router
// from crashing on old builds and to redirect old /profile links to the dashboard.
// @ts-expect-error: This route was removed from the generated tree but kept for redirects
export const Route = createFileRoute("/profile")({
  beforeLoad: () => {
    throw redirect({
      to: "/dashboard",
    });
  },
  component: () => null,
});
