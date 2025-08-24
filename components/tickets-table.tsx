"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Ticket } from "@/lib/mock-data"

interface TicketsTableProps {
  tickets: Ticket[]
  onTicketClick: (ticket: Ticket) => void
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "backlog":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "todo":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "doing":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "in_review":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "done":
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

export function TicketsTable({ tickets, onTicketClick }: TicketsTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tickets found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onTicketClick(ticket)}
            >
              <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
              <TableCell>
                <div className="max-w-[300px]">
                  <p className="font-medium truncate">{ticket.subject}</p>
                  <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{ticket.user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{ticket.user.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {ticket.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{ticket.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{ticket.assignee.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Unassigned</span>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {ticket.group}
                </Badge>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`text-xs ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{formatDate(ticket.updatedAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        onTicketClick(ticket)
                      }}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Assign to Me</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Change Status</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
