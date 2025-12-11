"use client"

import { RegisterEventForm } from "@/components/events/register-event-form"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterEventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params?.id as string

  if (!eventId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Invalid event ID</p>
          <Button asChild className="mt-4">
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/events/${eventId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to event
        </Link>

        {/* Register Form */}
        <RegisterEventForm eventId={eventId} />
      </div>
    </div>
  )
}

