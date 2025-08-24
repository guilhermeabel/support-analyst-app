"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle, Users } from "lucide-react"

// Mock data for metrics
const metricsData = {
  openTickets: {
    current: 24,
    change: +3,
    trend: "up" as const,
  },
  avgResponseTime: {
    current: 2.4,
    change: -0.3,
    trend: "down" as const,
    unit: "hours",
  },
  unassignedTickets: {
    current: 7,
    change: -2,
    trend: "down" as const,
  },
  myTickets: {
    current: 12,
    change: +1,
    trend: "up" as const,
  },
  resolvedToday: {
    current: 18,
    change: +5,
    trend: "up" as const,
  },
  slaCompliance: {
    current: 94.2,
    change: +1.8,
    trend: "up" as const,
    unit: "%",
  },
}

interface MetricCardProps {
  title: string
  description: string
  value: string | number
  change: number
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
  unit?: string
}

function MetricCard({ title, description, value, change, trend, icon: Icon, unit = "" }: MetricCardProps) {
  const isPositive = trend === "up"
  const changeColor = isPositive ? "text-green-600" : "text-red-600"
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">
          {value}
          {unit}
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <TrendIcon className={`h-3 w-3 ${changeColor}`} />
          <span className={changeColor}>
            {change > 0 ? "+" : ""}
            {change}
            {unit}
          </span>
          <span className="text-muted-foreground">from last week</span>
        </div>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Open Tickets"
        description="Total active support requests"
        value={metricsData.openTickets.current}
        change={metricsData.openTickets.change}
        trend={metricsData.openTickets.trend}
        icon={AlertTriangle}
      />
      <MetricCard
        title="Avg Response Time"
        description="Time to first response"
        value={metricsData.avgResponseTime.current}
        change={metricsData.avgResponseTime.change}
        trend={metricsData.avgResponseTime.trend}
        icon={Clock}
        unit="h"
      />
      <MetricCard
        title="Unassigned Tickets"
        description="Tickets awaiting assignment"
        value={metricsData.unassignedTickets.current}
        change={metricsData.unassignedTickets.change}
        trend={metricsData.unassignedTickets.trend}
        icon={Users}
      />
      <MetricCard
        title="My Active Tickets"
        description="Tickets assigned to you"
        value={metricsData.myTickets.current}
        change={metricsData.myTickets.change}
        trend={metricsData.myTickets.trend}
        icon={Users}
      />
      <MetricCard
        title="Resolved Today"
        description="Tickets closed today"
        value={metricsData.resolvedToday.current}
        change={metricsData.resolvedToday.change}
        trend={metricsData.resolvedToday.trend}
        icon={CheckCircle}
      />
      <MetricCard
        title="SLA Compliance"
        description="Meeting response time goals"
        value={metricsData.slaCompliance.current}
        change={metricsData.slaCompliance.change}
        trend={metricsData.slaCompliance.trend}
        icon={TrendingUp}
        unit="%"
      />
    </div>
  )
}
