import Image from "next/image"
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Event } from "@/types/events"
import Link from "next/link"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const formatTime = (start: string, end: string) => {
    return `${start} - ${end}`
  }

  const isRegistrationOpen = new Date(event.registrationEnd) > new Date()

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-shadow hover:shadow-lg">
      <div className="relative w-full aspect-video h-[15rem] bg-muted">
        {event.eventPoster ? (
          <img src={event.eventPoster || "/placeholder.svg"} alt={event.eventName}  className="object-cover h-full w-full" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Calendar className="w-12 h-12" />
          </div>
        )}
        {/* Registration Status Badge */}
        <Badge variant={isRegistrationOpen ? "default" : "secondary"} className="absolute top-3 right-3">
          {isRegistrationOpen ? "Open" : "Closed"}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 mb-2">
          {event.logo ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-border shrink-0">
              <img src={event.logo || "/placeholder.svg"} alt={event.clubName}  className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 border-2 border-border">
              <span className="text-xs font-medium text-muted-foreground">
                {event.clubName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <p className="text-sm font-medium text-muted-foreground">{event.clubName}</p>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{event.eventName}</h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{formatDate(event.dateOfEvent)}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{formatTime(event.eventStartTime, event.eventEndTime)}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 shrink-0" />
            <span>Max {event.maxParticipants} participants</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full" disabled={!isRegistrationOpen}>
         <Link href={'/events/'+event.id}>
         View Event 
        <ExternalLink className="w-4 h-4 ml-2" />
         </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
