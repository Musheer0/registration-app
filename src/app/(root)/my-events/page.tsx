import MyEventsList from '@/components/events/my-events-list'
import React from 'react'

const Page = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Events</h1>
        <p className="text-muted-foreground">
          Events you've created and are managing.
        </p>
      </div>

      {/* Event List */}
      <MyEventsList/>
    </div>
  )
}

export default Page
