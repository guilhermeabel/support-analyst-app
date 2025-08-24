"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "ticket_created",
    title: "Database connection timeout",
    user: "Sarah Chen",
    userInitials: "SC",
    time: "2 minutes ago",
    priority: "high",
    status: "open",
  },
  {
    id: 2,
    type: "ticket_resolved",
    title: "Storage quota exceeded",
    user: "Mike Johnson",
    userInitials: "MJ",
    time: "15 minutes ago",
    priority: "medium",
    status: "resolved",
  },
  {
    id: 3,
    type: "ticket_updated",
    title: "Network latency issues",
    user: "Alex Rodriguez",
    userInitials: "AR",
    time: "1 hour ago",
    priority: "low",
    status: "in_progress",
  },
  {
    id: 4,
    type: "ticket_assigned",
    title: "Backup restoration failed",
    user: "Emily Davis",
    userInitials: "ED",
    time: "2 hours ago",
    priority: "high",
    status: "assigned",
  },
  {
    id: 5,
    type: "ticket_commented",
    title: "SSL certificate renewal",
    user: "John Smith",
    userInitials: "JS",
    time: "3 hours ago",
    priority: "medium",
    status: "in_progress",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "ticket_created":
      return <AlertCircle className="h-4 w-4 text-orange-500" />
    case "ticket_resolved":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "ticket_updated":
    case "ticket_assigned":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "ticket_commented":
      return <MessageSquare className="h-4 w-4 text-purple-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-serif">Recent Activity</CardTitle>
        <CardDescription>Latest updates across all support tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-card-foreground truncate">{activity.title}</p>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(activity.priority)}`}>
                    {activity.priority}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">{activity.userInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{activity.user}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
