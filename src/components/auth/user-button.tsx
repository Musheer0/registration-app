"use client";

import React, { useMemo, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, User } from "lucide-react";

function AuthUserButtonComponent() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [isPending, session, router]);

  // Memoize user for performance
  const user = useMemo(() => session?.user, [session]);

  // Memoize avatar UI
  const avatarUI = useMemo(() => {
    if (!user) return null;

    // Get user initials for fallback
    const initials = user.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";

    return (
      <Avatar className="cursor-pointer">
        {user.image && <AvatarImage src={user.image} alt={user.name || "User"} />}
        <AvatarFallback>
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    );
  }, [user]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (!user) return null; // prevents flashing

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{avatarUI}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2 text-sm">
          <p className="font-medium">{user.name || "User"}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={() =>
            authClient.signOut().then(() => router.push("/login"))
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 🔥 Memoized so it only re-renders when props/session actually changes
export const AuthUserButton = React.memo(AuthUserButtonComponent);
