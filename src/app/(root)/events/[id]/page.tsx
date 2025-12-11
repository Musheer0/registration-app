/*  eslint-disable*/
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, MapPin, Users, ExternalLink, ArrowLeft, Building2, Edit, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { caller } from "@/trpc/server"
import { getSession } from "@/lib/session"
import type { Event } from "@/types/events"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // 🧠 Fetch event from backend (real data now)
  //@ts-ignore
  const event: Event | undefined = await caller.event.getOne({ id })

  if (!event) notFound()

  // Check if current user owns the event
  const session = await getSession()
  const isOwner = session?.user?.id === event.creator_id

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBD"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const isRegistrationOpen =
    event.registrationEnd ? new Date(event.registrationEnd) >= new Date() : false

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      {event.eventPoster ? (
        <div className="relative w-full h-[30vh] md:h-[40vh] bg-muted">
          <img
            src={event.eventPoster}
            alt={event.eventName}
            
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      ) : (
        <div className="w-full h-[20vh] bg-gradient-to-br from-muted to-muted/50" />
      )}

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 pb-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>

        {/* Header */}
        <div className="bg-background rounded-lg border p-6 sm:p-8 shadow-sm">
          {/* Club Info */}
          <div className="flex items-center gap-3 mb-6">
            {event.logo ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border shrink-0">
                <img
                  src={event.logo}
                  alt={event.clubName || "Club"}
                           className="object-cover w-full h-full"

                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0 border-2 border-border">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Hosted by</p>
              <p className="font-medium">{event.clubName || "Unknown Club"}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {event.eventName}
          </h1>

          {/* Status Badge */}
          <Badge variant={isRegistrationOpen ? "default" : "secondary"} className="mb-6">
            {isRegistrationOpen ? "Registration Open" : "Registration Closed"}
          </Badge>

          <Separator className="my-6" />

          {/* Event Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(event.dateOfEvent)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">
                  {event.eventStartTime || "TBD"} - {event.eventEndTime || "TBD"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Venue</p>
                <p className="font-medium">{event.venue || "TBD"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Users className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Capacity</p>
                <p className="font-medium">
                  {event.maxParticipants
                    ? `${event.maxParticipants} participants`
                    : "Unlimited"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">About this event</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {/* Registration Deadline */}
          {event.registrationEnd && (
            <div className="p-4 rounded-lg border bg-muted/30 mb-8">
              <p className="text-sm text-muted-foreground">Registration deadline</p>
              <p className="font-medium">{formatDate(event.registrationEnd)}</p>
            </div>
          )}

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex gap-2 mb-4">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/events/${id}/admin`}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Statistics
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/events/${id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Event
                </Link>
              </Button>
            </div>
          )}

          {/* Register Button */}
         {isRegistrationOpen ? 
       <>
         {!isOwner && (
          <>
            <Button asChild size="lg" className="w-full" disabled={!isRegistrationOpen}>
              <Link href={`/events/${id}/register`}>
                Register for this event
              </Link>
            </Button>
            
         
          </>
        )}
       </>
        :
        <>
        <p className="text-sm text-muted-foreground">Registration is closed for this event</p>
        </> 
        }
        </div>
      </main>
    </div>
  )
}
