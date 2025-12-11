/* eslint-disable  */

import { notFound } from "next/navigation"
import { caller } from "@/trpc/server"
import { getSession } from "@/lib/session"
import { EditEventForm } from "@/components/events/edit-event-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/types/events"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Fetch event
  //@ts-ignore
  const event: Event | undefined = await caller.event.getOne({ id })

  if (!event) notFound()

  // Verify user owns the event
  const session = await getSession()
  if (!session?.user || session.user.id !== event.creator_id) {
    notFound() // Don't reveal that the event exists if user doesn't own it
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/events/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to event
        </Link>
        <EditEventForm eventId={id} event={event} />
      </div>
    </div>
  )
}

