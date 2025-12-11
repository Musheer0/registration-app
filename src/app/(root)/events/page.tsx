import Events from '@/components/events/events'
import React from 'react'

const Page = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-muted-foreground">
          All the events you've created or are involved in.
        </p>
      </div>

      {/* Event List */}
      <Events/>
    </div>
  )
}

export default Page
