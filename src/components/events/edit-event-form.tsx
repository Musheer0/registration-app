"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createEventSchema, type CreateEventInput } from "@/zod/createEventSchema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import { CalendarIcon, Clock, Users, Link, Building2, FileText, ImageIcon } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { useEffect } from "react"
import type { Event } from "@/types/events"

interface EditEventFormProps {
  eventId: string
  event: Event
}

export function EditEventForm({ eventId, event }: EditEventFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventName: event.eventName || "",
      description: event.description || "",
      venue: event.venue || "",
      dateOfEvent: event.dateOfEvent ? new Date(event.dateOfEvent).toISOString().split('T')[0] : "",
      eventStartTime: event.eventStartTime || "",
      eventEndTime: event.eventEndTime || "",
      maxParticipants: event.maxParticipants?.toString() || "",
      registrationEnd: event.registrationEnd ? new Date(event.registrationEnd).toISOString().split('T')[0] : "",
      clubName: event.clubName || "",
      googleFormLink: event.googleFormLink || "https://forms.gle/CdFuxvgp4uyhmKNH7",
    },
  })

  const trpc = useTRPC()
  const router = useRouter()
  const eventPoster = watch("eventPoster")
  const eventLogo = watch("eventLogo")

  const { mutate, isPending } = useMutation(trpc.event.update.mutationOptions())

  const onSubmit = async (data: CreateEventInput) => {
    await mutate(
      {
        ...data,
        id: eventId,
      },
      {
        onSuccess: () => {
          toast.success("Event updated successfully!")
          router.push(`/events/${eventId}`)
        },
        onError: (err) => {
          toast.error(err.message || "Failed to update event")
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Event</CardTitle>
        <CardDescription>Update the details below to modify your event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="eventName" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Event Name *
            </Label>
            <Input id="eventName" placeholder="Enter event name" {...register("eventName")} />
            {errors.eventName && <p className="text-sm text-destructive">{errors.eventName.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" placeholder="Describe your event..." rows={4} {...register("description")} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          {/* Club Name & Venue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clubName" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Club Name *
              </Label>
              <Input id="clubName" placeholder="Enter club name" {...register("clubName")} />
              {errors.clubName && <p className="text-sm text-destructive">{errors.clubName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue *</Label>
              <Input id="venue" placeholder="Event location" {...register("venue")} />
              {errors.venue && <p className="text-sm text-destructive">{errors.venue.message}</p>}
            </div>
          </div>

          {/* Date of Event & Registration End */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfEvent" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Event Date *
              </Label>
              <Input id="dateOfEvent" type="date" {...register("dateOfEvent")} />
              {errors.dateOfEvent && <p className="text-sm text-destructive">{errors.dateOfEvent.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationEnd">Registration Deadline *</Label>
              <Input id="registrationEnd" type="date" {...register("registrationEnd")} />
              {errors.registrationEnd && <p className="text-sm text-destructive">{errors.registrationEnd.message}</p>}
            </div>
          </div>

          {/* Start & End Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventStartTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time *
              </Label>
              <Input id="eventStartTime" type="time" {...register("eventStartTime")} />
              {errors.eventStartTime && <p className="text-sm text-destructive">{errors.eventStartTime.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventEndTime">End Time *</Label>
              <Input id="eventEndTime" type="time" {...register("eventEndTime")} />
              {errors.eventEndTime && <p className="text-sm text-destructive">{errors.eventEndTime.message}</p>}
            </div>
          </div>

          {/* Max Participants */}
          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Max Participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              min="0"
              placeholder="Optional"
              {...register("maxParticipants")}
            />
            {errors.maxParticipants && <p className="text-sm text-destructive">{errors.maxParticipants.message}</p>}
          </div>

          {/* Google Form Link */}
          <div className="space-y-2">
            <Label htmlFor="googleFormLink" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Google Form Link
            </Label>
            <Input
              id="googleFormLink"
              type="url"
              placeholder="https://forms.google.com/..."
              {...register("googleFormLink")}
            />
            {errors.googleFormLink && <p className="text-sm text-destructive">{errors.googleFormLink.message}</p>}
          </div>

          {/* Event Poster and Logo Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Poster Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Event Poster
              </Label>
              {event.eventPoster && !eventPoster && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Current poster:</p>
                  <img src={event.eventPoster} alt="Current poster" className="w-full h-32 object-cover rounded-md" />
                </div>
              )}
              <FileUpload
                value={eventPoster}
                onChange={(file) => setValue("eventPoster", file, { shouldValidate: true })}
                accept="image/*"
                maxSize={5}
              />
              <p className="text-xs text-muted-foreground">Upload new poster. Max 5MB. Leave empty to keep current.</p>
            </div>

            {/* Event Logo Upload */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Event Logo
              </Label>
              {event.logo && !eventLogo && (
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Current logo:</p>
                  <img src={event.logo} alt="Current logo" className="w-24 h-24 object-cover rounded-full" />
                </div>
              )}
              <FileUpload
                value={eventLogo}
                onChange={(file) => setValue("eventLogo", file, { shouldValidate: true })}
                accept="image/*"
                maxSize={2}
              />
              <p className="text-xs text-muted-foreground">Upload new logo. Max 2MB. Leave empty to keep current.</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isPending || isSubmitting}>
              {isPending || isSubmitting ? "Updating Event..." : "Update Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

