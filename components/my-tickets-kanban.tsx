"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Ticket } from "@/lib/mock-data"

interface MyTicketsKanbanProps {
  tickets: Ticket[]
  onTicketClick: (ticket: Ticket) => void
}

const statusColumns = [
  { status: "backlog", title: "Backlog", color: "bg-gray-100" },
  { status: "todo", title: "To Do", color: "bg-blue-100" },
  { status: "doing", title: "In Progress", color: "bg-purple-100" },
  { status: "in_review", title: "In Review", color: "bg-orange-100" },
  { status: "done", title: "Done", color: "bg-green-100" },
] as const

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}

function TicketCard({ ticket, onTicketClick }: { ticket: Ticket; onTicketClick: (ticket: Ticket) => void }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow mb-3" onClick={() => onTicketClick(ticket)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium">{ticket.subject}</CardTitle>
            <CardDescription className="text-xs font-mono text-muted-foreground mt-1">{ticket.id}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Change Status</DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Add Comment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{ticket.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-xs">{ticket.user.initials}</AvatarFallback>
              </Avatar>
              <span>{ticket.user.name}</span>
            </div>
            <Badge variant="outline" className={`text-xs ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex flex-wrap gap-1">
              {ticket.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {ticket.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{ticket.tags.length - 2}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(ticket.updatedAt)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MyTicketsKanban({ tickets, onTicketClick }: MyTicketsKanbanProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statusColumns.map((column) => {
        const columnTickets = tickets.filter((ticket) => ticket.status === column.status)

        return (
          <div key={column.status} className="space-y-3">
            <div className={`p-3 rounded-lg ${column.color}`}>
              <h3 className="font-medium text-sm">{column.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {columnTickets.length} ticket{columnTickets.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="space-y-2">
              {columnTickets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-xs">No tickets</p>
                </div>
              ) : (
                columnTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} onTicketClick={onTicketClick} />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
