"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User, Mail, Phone, GraduationCap, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Registration {
  id: string
  name: string
  email: string
  usn: string
  phoneNumber: string
  createdAt: Date | string
  attendedAt?: Date | string | null
}

interface UserDetailsDialogProps {
  registration: Registration | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailsDialog({
  registration,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  if (!registration) return null

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Not set"
    try {
      return new Date(date).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return String(date)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Registration Details</DialogTitle>
          <DialogDescription>Complete information about this registration</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <User className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{registration.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Mail className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{registration.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <GraduationCap className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">USN (University Serial Number)</p>
                  <p className="font-medium">{registration.usn}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{registration.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Registration Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Registration Information</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Registered On</p>
                  <p className="font-medium">{formatDate(registration.createdAt)}</p>
                </div>
              </div>

              {registration.attendedAt && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Attended At</p>
                    <p className="font-medium">{formatDate(registration.attendedAt)}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={registration.attendedAt ? "default" : "secondary"}>
                  {registration.attendedAt ? "Attended" : "Registered"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

