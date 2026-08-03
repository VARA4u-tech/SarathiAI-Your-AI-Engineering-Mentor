import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { setToken } from "@/lib/demo-auth";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: search.token as string | undefined,
    };
  },
});

function AuthCallback() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setToken(token);
      // Wait a tiny bit so the UI has time to settle, then redirect
      setTimeout(() => {
        navigate({ to: "/import", replace: true });
      }, 100);
    } else {
      // If no token, redirect to login
      setTimeout(() => {
        navigate({ to: "/login", replace: true });
      }, 100);
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#110d16] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-white">
        <Loader2 className="size-8 animate-spin text-fuchsia-300" />
        <p className="text-sm font-medium">Authenticating...</p>
      </div>
    </div>
  );
}
