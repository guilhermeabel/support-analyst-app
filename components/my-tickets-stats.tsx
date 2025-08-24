"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import type { Ticket } from "@/lib/mock-data"

interface MyTicketsStatsProps {
  tickets: Ticket[]
}

export function MyTicketsStats({ tickets }: MyTicketsStatsProps) {
  const totalTickets = tickets.length
  const completedTickets = tickets.filter((t) => t.status === "done").length
  const inProgressTickets = tickets.filter((t) => t.status === "doing").length
  const highPriorityTickets = tickets.filter((t) => t.priority === "high" || t.priority === "critical").length

  const completionRate = totalTickets > 0 ? (completedTickets / totalTickets) * 100 : 0

  // Calculate average age of active tickets
  const activeTickets = tickets.filter((t) => t.status !== "done")
  const avgAge =
    activeTickets.length > 0
      ? activeTickets.reduce((sum, ticket) => {
          const age = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24))
          return sum + age
        }, 0) / activeTickets.length
      : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTickets}</div>
          <p className="text-xs text-muted-foreground">{highPriorityTickets} high priority</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTickets}</div>
          <p className="text-xs text-muted-foreground">Currently working on</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTickets}</div>
          <p className="text-xs text-muted-foreground">{completionRate.toFixed(1)}% completion rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Age</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgAge.toFixed(1)}d</div>
          <p className="text-xs text-muted-foreground">Active tickets average</p>
        </CardContent>
      </Card>
    </div>
  )
}
