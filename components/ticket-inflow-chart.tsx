"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for ticket inflow over the last 7 days
const ticketInflowData = [
  { date: "Mon", tickets: 12, resolved: 8 },
  { date: "Tue", tickets: 19, resolved: 15 },
  { date: "Wed", tickets: 8, resolved: 12 },
  { date: "Thu", tickets: 15, resolved: 10 },
  { date: "Fri", tickets: 22, resolved: 18 },
  { date: "Sat", tickets: 6, resolved: 9 },
  { date: "Sun", tickets: 4, resolved: 7 },
]

const chartConfig = {
  tickets: {
    label: "New Tickets",
    color: "hsl(var(--chart-1))",
  },
  resolved: {
    label: "Resolved",
    color: "hsl(var(--chart-2))",
  },
}

export function TicketInflowChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-serif">Ticket Activity</CardTitle>
        <CardDescription>New tickets vs resolved tickets over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ticketInflowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="tickets"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorTickets)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="resolved"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorResolved)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
