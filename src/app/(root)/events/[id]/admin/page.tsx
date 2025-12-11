/* eslint-disable  */
"use client"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

import { useParams, useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { useQuery, useMutation } from "@tanstack/react-query"
import { ArrowLeft, Users, TrendingUp, Calendar, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { UserDetailsDialog } from "@/components/events/user-details-dialog"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

export default function AdminPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params?.id as string
  const trpc = useTRPC()
  //@ts-ignore
  const [selectedUser, setSelectedUser] = useState<typeof statistics.registrations[0] | null>(null)

  const { data: statistics, isLoading, error, refetch } = useQuery(
    trpc.event.getStatistics.queryOptions({ eventId })
  )

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation(
    trpc.event.delete.mutationOptions()
  )
const exportPDF = () => {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text(statistics?.event?.eventName + " — Event Report", 14, 18)

  doc.setFontSize(11)
  doc.text("Generated on: " + new Date().toLocaleString(), 14, 26)

  // 🟦 Event Stats Table
  autoTable(doc, {
    startY: 36,
    head: [["Metric", "Value"]],
    body: [
      ["Total Registered", statistics?.totalRegistered||0],
      ["Max Participants", statistics?.maxParticipants || "∞"],
      ["Registration Rate", statistics?.registrationRate + "%"],
      ["Available Spots", statistics?.availableSpots || "∞"],
      [
        "Event Date",
        statistics?.event?.dateOfEvent
          ? new Date(statistics.event.dateOfEvent).toLocaleDateString()
          : "TBD",
      ],
    ],
  })

  // Users Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 12,
    head: [["Name", "Email", "USN", "Phone", "Registered"]],
    body: statistics?.registrations.map((u) => [
      u.name,
      u.email,
      u.usn,
      u.phoneNumber,
      new Date(u.createdAt).toLocaleDateString(),
    ]),
  })

  doc.save(`${statistics?.event?.eventName}-report.pdf`)
}

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* HEADER SKELETON */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-24" />
            </div>
  
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>
  
          {/* STAT CARDS */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1,2,3,4].map((i) => (
              <Card key={i}>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-5" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
  
          {/* CHARTS */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="h-[380px]">
              <CardHeader>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
  
            <Card className="h-[380px]">
              <CardHeader>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>
  
          {/* REGISTERED USERS LIST */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  if (error || !statistics) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 text-destructive">
            {error?.message || "Failed to load statistics"}
          </div>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    deleteEvent(
      { id: eventId },
      {
        onSuccess: () => {
          toast.success("Event deleted successfully")
          router.push("/my-events")
        },
        onError: (err) => {
          toast.error(err.message || "Failed to delete event")
        },
      }
    )
  }

  // Prepare chart data
  const registrationDates = Object.entries(statistics.registrationsByDate).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count,
  }))

  const pieData = [
    {
      name: "Registered",
      value: statistics.totalRegistered,
    },
    {
      name: "Available",
      value: statistics.availableSpots || 0,
    },
  ].filter((item) => item.value > 0)

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/events/${eventId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to event
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{statistics?.event?.eventName}</h1>
              <p className="text-muted-foreground mt-1">Event Statistics & Management</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={exportPDF}>
    Export PDF
  </Button>


              <Button asChild variant="outline">
                <Link href={`/events/${eventId}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Event
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Event"}
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registered</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.totalRegistered}</div>
              {statistics.maxParticipants > 0 && (
                <p className="text-xs text-muted-foreground">
                  of {statistics.maxParticipants} max
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registration Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.registrationRate}%</div>
              <p className="text-xs text-muted-foreground">of capacity filled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Spots</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics.availableSpots !== null ? statistics.availableSpots : "∞"}
              </div>
              <p className="text-xs text-muted-foreground">remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Event Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics?.event?.dateOfEvent
                  ? new Date(statistics.event.dateOfEvent).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "TBD"}
              </div>
              <p className="text-xs text-muted-foreground">scheduled date</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {/* Registration Timeline Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Timeline</CardTitle>
              <CardDescription>Registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              {registrationDates.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={registrationDates}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No registrations yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Registration Distribution Pie Chart */}
          {statistics.maxParticipants > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Registration Status</CardTitle>
                <CardDescription>Registered vs Available</CardDescription>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent||0 * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Registered Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>
              {statistics.totalRegistered} user{statistics.totalRegistered !== 1 ? "s" : ""}{" "}
              registered for this event
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statistics.registrations.length > 0 ? (
              <div className="space-y-2">
                {statistics.registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedUser(registration)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{registration.name}</p>
                        <p className="text-sm text-muted-foreground">{registration.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{registration.usn}</p>
                        <p className="text-xs text-muted-foreground">{registration.phoneNumber}</p>
                      </div>
                      <Badge variant="secondary">
                        {new Date(registration.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No users registered yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details Dialog */}
        <UserDetailsDialog
          registration={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
        />
      </div>
    </div>
  )
}

