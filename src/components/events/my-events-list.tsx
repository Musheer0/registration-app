// eslint-disable-next-line @typescript-eslint/no-explicit-any

"use client"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import EventList from "@/components/events/event-list"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const MyEventsList = () => {
  const trpc = useTRPC()

  const { data, isLoading, error } = useQuery(
    trpc.event.getAll.queryOptions()
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            {/* top banner skeleton */}
            <Skeleton className="h-40 w-full rounded-xl" />

            {/* title line */}
            <Skeleton className="h-4 w-3/4" />

            {/* sub line */}
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
          Something snapped 💀
        </p>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  return <EventList events={data as any[] ?? []} />
}

export default MyEventsList
