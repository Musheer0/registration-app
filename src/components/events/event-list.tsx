"use client"

import { useState, useMemo } from "react"
import { EventCard } from "@/components/events/event-card"
import type { Event } from "@/types/events"

interface EventListProps {
  events: Event[]
}

export default function EventList({ events }: EventListProps) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | "live" | "closed">("all")

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const now = new Date()
      const text = search.toLowerCase()

      const comboMatch =
        e.eventName.toLowerCase().includes(text) ||
        e.venue?.toLowerCase().includes(text) ||
        e.clubName?.toLowerCase().includes(text)

      const isLive = new Date(e.eventEndTime) > now
      const isClosed = !isLive

      const statusMatch =
        status === "all"
          ? true
          : status === "live"
            ? isLive
            : isClosed

      return comboMatch && statusMatch
    })
  }, [events, search, status])

  return (
    <div className="space-y-6">

      {/* 🔥 Combined Search Bar Layout */}
      <div className="flex items-center gap-3 border rounded-2xl px-4 py-2 bg-background">
        <input
          className="flex-1 bg-transparent outline-none py-2"
          placeholder="Search by name, club, place..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-transparent border rounded-xl px-3 py-2 outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="live">Live</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
