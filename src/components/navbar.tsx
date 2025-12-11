"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, User } from "lucide-react"
import { AuthUserButton } from "@/components/auth/user-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Events", href: "/events", icon: Calendar },
  { name: "My Events", href: "/my-events", icon: Home },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/events" className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <span className="text-xl font-bold">EventHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href === "/events" && (pathname === "/" || pathname?.startsWith("/events"))) ||
              (item.href === "/my-events" && pathname?.startsWith("/my-events"))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AuthUserButton />
        </div>
      </div>
    </nav>
  )
}

