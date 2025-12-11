"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, GraduationCap } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'

const registerEventSchema = z.object({
  usn: z.string().min(1, "USN is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
})

type RegisterEventInput = z.infer<typeof registerEventSchema>

interface RegisterEventFormProps {
  eventId: string
}

export function RegisterEventForm({ eventId }: RegisterEventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterEventInput>({
    resolver: zodResolver(registerEventSchema),
  })

  const trpc = useTRPC()
  const router = useRouter()

  // Check registration status
  const { data: registrationStatus, refetch } = useQuery(
    trpc.participants.getRegistrationStatus.queryOptions({ eventId })
  )

  const { mutate, isPending } = useMutation(trpc.participants.register.mutationOptions())

  const onSubmit = async (data: RegisterEventInput) => {
    await mutate(
      {
        eventId,
        usn: data.usn,
        phoneNumber: data.phoneNumber,
      },
      {
        onSuccess: () => {
          toast.success("Successfully registered for the event!")
          refetch()
          router.refresh()
        },
        onError: (err) => {
          toast.error(err.message || "Failed to register for event")
        },
      }
    )
  }

  // If already registered, show success message
  if (registrationStatus?.isRegistered) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">Already Registered</CardTitle>
          <CardDescription>
            You have successfully registered for this event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                Registration confirmed! Check your email for further details.
              </p>
            </div>
            {registrationStatus.registration && (
              <div className="space-y-2 text-sm">
                <p><strong>USN:</strong> {registrationStatus.registration.usn}</p>
                <p><strong>Phone:</strong> {registrationStatus.registration.phoneNumber}</p>
                <p><strong>Registered on:</strong> {new Date(registrationStatus.registration.createdAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Register for Event</CardTitle>
        <CardDescription>
          Fill in your details below to register for this event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* USN */}
          <div className="space-y-2">
            <Label htmlFor="usn" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              USN (University Serial Number) *
            </Label>
            <Input
              id="usn"
              placeholder="Enter your USN"
              {...register("usn")}
            />
            {errors.usn && (
              <p className="text-sm text-destructive">{errors.usn.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Info Note */}
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Your name and email will be automatically taken from your profile.
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isPending || isSubmitting}>
            {isPending || isSubmitting ? "Registering..." : "Register for Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

