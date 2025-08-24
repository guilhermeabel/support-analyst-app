"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Calendar,
  Clock,
  User,
  Tag,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Users,
} from "lucide-react"
import type { Ticket } from "@/lib/mock-data"

interface TicketDetailModalProps {
  ticket: Ticket | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (ticketId: string, newStatus: Ticket["status"]) => void
}

const statusOptions: { value: Ticket["status"]; label: string; color: string }[] = [
  { value: "backlog", label: "Backlog", color: "bg-gray-100 text-gray-800" },
  { value: "todo", label: "To Do", color: "bg-blue-100 text-blue-800" },
  { value: "doing", label: "In Progress", color: "bg-purple-100 text-purple-800" },
  { value: "in_review", label: "In Review", color: "bg-orange-100 text-orange-800" },
  { value: "done", label: "Done", color: "bg-green-100 text-green-800" },
]

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
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Mock AI responses based on ticket content
const generateAIResponse = (ticket: Ticket) => {
  const refinedRequests: Record<string, string> = {
    "TKT-001":
      "Critical database connectivity issue affecting 30% of users during peak hours. Requires immediate investigation of connection pool settings and database server performance metrics.",
    "TKT-002":
      "Backup storage capacity exceeded - implement automated cleanup policy for backups older than 30 days and consider increasing storage allocation by 50%.",
    "TKT-003":
      "EU region experiencing 10x increase in response times (200ms → 2.5s). Investigate CDN configuration and consider adding additional edge servers in European locations.",
    "TKT-004":
      "SSL certificate expiring in 7 days for main domain. Schedule renewal with current certificate authority and update deployment pipeline to include certificate validation.",
    "TKT-005":
      "Client data restoration failure with error 500. Verify backup integrity, check storage permissions, and attempt restoration using alternative backup from previous day.",
  }

  const solutions: Record<string, string> = {
    "TKT-001":
      "1. Check database connection pool configuration\n2. Monitor CPU and memory usage on database server\n3. Review slow query logs for performance bottlenecks\n4. Consider implementing connection retry logic with exponential backoff",
    "TKT-002":
      "1. Implement automated cleanup script for backups older than 30 days\n2. Request storage quota increase from infrastructure team\n3. Set up monitoring alerts for storage usage above 80%\n4. Consider implementing backup compression to reduce storage requirements",
    "TKT-003":
      "1. Check CDN cache hit rates in EU region\n2. Review network routing tables for optimal paths\n3. Consider deploying additional edge servers in Frankfurt and London\n4. Implement geographic load balancing for EU traffic",
    "TKT-004":
      "1. Generate new SSL certificate through Let's Encrypt or current CA\n2. Update certificate in load balancer configuration\n3. Test certificate installation in staging environment\n4. Schedule maintenance window for production deployment",
    "TKT-005":
      "1. Verify backup file integrity using checksum validation\n2. Check file system permissions on backup storage\n3. Attempt restoration using backup from previous day\n4. Contact client to confirm data recovery requirements and timeline",
  }

  return {
    refinedRequest: refinedRequests[ticket.id] || "AI analysis of this ticket is being processed...",
    possibleSolution: solutions[ticket.id] || "AI is analyzing similar cases to suggest optimal solutions...",
  }
}

export function TicketDetailModal({ ticket, isOpen, onClose, onStatusChange }: TicketDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState<Ticket["status"]>(ticket?.status || "backlog")
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  if (!ticket) return null

  const aiResponse = generateAIResponse(ticket)

  const handleStatusChange = (newStatus: Ticket["status"]) => {
    setCurrentStatus(newStatus)
    onStatusChange?.(ticket.id, newStatus)

    // Show different toasts based on status change
    if (newStatus === "done") {
      toast({
        title: "Ticket Completed",
        description: `${ticket.id} has been marked as resolved. Client notification sent automatically.`,
      })
    } else if (newStatus === "doing") {
      toast({
        title: "Ticket In Progress",
        description: `${ticket.id} is now being actively worked on.`,
      })
    } else {
      toast({
        title: "Status Updated",
        description: `${ticket.id} moved to ${newStatus.replace("_", " ")}.`,
      })
    }
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the ticket.",
      })
      setComment("")
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-serif">{ticket.subject}</SheetTitle>
              <SheetDescription className="text-sm font-mono text-muted-foreground mt-1">{ticket.id}</SheetDescription>
            </div>
            <Badge variant="outline" className={`${getPriorityColor(ticket.priority)} text-xs`}>
              {ticket.priority.toUpperCase()}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Ticket Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Ticket Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Reported by:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{ticket.user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{ticket.user.name}</p>
                      <p className="text-xs text-muted-foreground">{ticket.user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assigned to:</span>
                  </div>
                  {ticket.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{ticket.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{ticket.assignee.name}</p>
                        <p className="text-xs text-muted-foreground">{ticket.assignee.email}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Unassigned</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Created:</span>
                  </div>
                  <p className="text-sm">{formatDate(ticket.createdAt)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last updated:</span>
                  </div>
                  <p className="text-sm">{formatDate(ticket.updatedAt)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ticket.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Section */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-lg font-serif flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                AI Assistant
              </CardTitle>
              <CardDescription>AI-powered analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-accent" />
                  Refined Request
                </h4>
                <div className="bg-accent/5 p-3 rounded-lg border border-accent/10">
                  <p className="text-sm leading-relaxed">{aiResponse.refinedRequest}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Possible Solution
                </h4>
                <div className="bg-accent/5 p-3 rounded-lg border border-accent/10">
                  <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {aiResponse.possibleSolution}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-serif">Status Management</CardTitle>
              <CardDescription>Update ticket status and add comments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Status</label>
                <Select value={currentStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${status.color}`} />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Add Comment</label>
                <Textarea
                  placeholder="Add a comment about your progress or findings..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment} disabled={!comment.trim()} className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
