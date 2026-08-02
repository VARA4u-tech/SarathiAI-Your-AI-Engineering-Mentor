import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { setToken } from "@/lib/demo-auth";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the token from the URL search params
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setToken(token);
      navigate({ to: "/dashboard", replace: true });
    } else {
      // If no token, redirect to login
      navigate({ to: "/login", replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#110d16] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-white">
        <Loader2 className="size-8 animate-spin text-fuchsia-300" />
        <p className="text-sm font-medium">Authenticating...</p>
      </div>
    </div>
  );
}
