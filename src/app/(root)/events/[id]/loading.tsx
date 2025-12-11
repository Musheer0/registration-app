import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingEventPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* cover skeleton */}
      <div className="w-full h-[30vh] md:h-[40vh] bg-muted relative">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 pb-16">
        {/* back link skeleton */}
        <Skeleton className="h-5 w-32 mb-6" />

        <div className="bg-background rounded-lg border p-6 sm:p-8 shadow-sm space-y-6">
          {/* club info */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* title */}
          <Skeleton className="h-8 w-2/3" />

          {/* badge */}
          <Skeleton className="h-6 w-32" />

          {/* details grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>

          {/* description */}
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          {/* registration deadline */}
          <div className="p-4 rounded-lg border bg-muted/30 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* buttons */}
          <Skeleton className="h-10 w-full" />
        </div>
      </main>
    </div>
  )
}
