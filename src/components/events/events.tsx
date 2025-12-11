// eslint-disable-next-line @typescript-eslint/no-explicit-any

"use client"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import EventList from "@/components/events/event-list"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const Events = () => {
  const trpc = useTRPC()

  const { data, isLoading, error } = useQuery(
    trpc.event.getAllPublic.queryOptions()
  )

  if (isLoading) {
    // Skeleton grid — looks fancy as hell
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
        <p className="text-destructive text-lg font-semibold">
          Bruh something snapped 💀
        </p>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <EventList events={data as any[] ?? []} />
    </div>
  )
}

export default Events
