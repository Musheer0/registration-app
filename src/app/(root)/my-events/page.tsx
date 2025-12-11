import MyEventsList from '@/components/events/my-events-list'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className="p-6 space-y-6 w-full">
      {/* Page Header */}
      <div className="space-y-2 flex items-center justify-between w-full">
       <div>
         <h1 className="text-3xl font-bold">My Events</h1>
        <p className="text-muted-foreground">
          Events you've created and are managing.
        </p>
       </div>
       <Link href={'/create-event'}>
       <Button size={'icon'}><PlusIcon/></Button>
       </Link>
      </div>

      {/* Event List */}
      <MyEventsList/>
    </div>
  )
}

export default Page
