"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
	Calendar,
	Clock,
	User,
	Tag,
	AlertCircle,
	Sparkles,
	MessageSquare,
	Users,
	Paperclip,
	Send,
	Lightbulb,
} from "lucide-react"
import type { Ticket } from "@/lib/mock-data"
import { Separator } from "./ui/separator"
import Link from "next/link"

interface TicketDetailContentProps {
	ticket: Ticket
	onStatusChange?: (ticketId: string, newStatus: Ticket["status"]) => void
}

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
	// ... (mock data, can be shortened or moved to a separate file)
	return {
		refinedRequest: `Based on the user's request and their account history, the issue seems to be related to a misconfiguration in their firewall settings. They are unable to access the new storage bucket created yesterday.`,
		possibleSolution: `1. Verify the firewall rules for the user's account.\n2. Ensure that the IP address range for their application servers is whitelisted.\n3. Check the IAM policy attached to the storage bucket.`,
		suggestedArticles: [
			{
				id: "kb-001",
				title: "Database Connection Troubleshooting Guide",
			},
			{
				id: "kb-004",
				title: "SSL Certificate Management Workflow",
			},
		],
	}
}

export function TicketDetailContent({ ticket, onStatusChange }: TicketDetailContentProps) {
	const [comment, setComment] = useState("")
	const [internalNotes, setInternalNotes] = useState<string[]>([])
	const { toast } = useToast()

	const aiResponse = generateAIResponse(ticket)

	const handleSendMessage = () => {
		if (comment.trim()) {
			toast({
				title: "Message Sent",
				description: "Your message has been sent to the user.",
			})
			setComment("")
		}
	}

	const handleSuggestApproach = () => {
		const newNote = `AI Suggestion: Based on the latest user interaction, consider checking the VPC flow logs for any denied traffic. This might indicate a security group issue rather than a firewall rule misconfiguration.`
		setInternalNotes([...internalNotes, newNote])
		toast({
			title: "New Suggestion Added",
			description: "A new internal note has been added by the AI assistant.",
		})
	}

	return (
		<div className="flex flex-col h-full p-6">
			<div className="space-y-4 pb-4">
				<div className="flex items-start justify-between">
					<div>
						<h2 className="text-xl font-bold">{ticket.subject}</h2>
						<p className="text-sm font-mono text-muted-foreground mt-1">{ticket.id}</p>
					</div>
					<Badge variant="outline" className={`${getPriorityColor(ticket.priority)} text-xs`}>
						{ticket.priority.toUpperCase()}
					</Badge>
				</div>

				{/* Ticket Information */}
				<Card>
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<AlertCircle className="h-5 w-5" />
							Ticket Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4 text-sm">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<strong>Reported by:</strong>
								<div className="flex items-center gap-2 mt-1">
									<Avatar className="h-6 w-6">
										<AvatarFallback className="text-xs">{ticket.user.initials}</AvatarFallback>
									</Avatar>
									<span>{ticket.user.name}</span>
								</div>
							</div>
							<div>
								<strong>Assigned to:</strong>
								<div className="flex items-center gap-2 mt-1">
									{ticket.assignee ? (
										<>
											<Avatar className="h-6 w-6">
												<AvatarFallback className="text-xs">{ticket.assignee.initials}</AvatarFallback>
											</Avatar>
											<span>{ticket.assignee.name}</span>
										</>
									) : (
										<span className="text-muted-foreground">Unassigned</span>
									)}
								</div>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<strong>Created:</strong> {formatDate(ticket.createdAt)}
							</div>
							<div>
								<strong>Last updated:</strong> {formatDate(ticket.updatedAt)}
							</div>
						</div>
						<div>
							<strong>Tags:</strong>
							<div className="flex flex-wrap gap-2 mt-1">
								{ticket.tags.map((tag) => (
									<Badge key={tag} variant="secondary">
										{tag}
									</Badge>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Separator className="my-4" />

			{/* Chat Timeline */}
			<div className="flex-1 space-y-6 overflow-auto pr-4 -mr-4">
				<h3 className="text-lg font-semibold">Timeline</h3>
				{/* User's Initial Message */}
				<div className="flex items-start gap-3">
					<Avatar className="h-9 w-9">
						<AvatarFallback className="bg-primary text-primary-foreground">{ticket.user.initials}</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<div className="font-semibold">{ticket.user.name}</div>
						<div className="bg-muted p-3 rounded-lg text-sm">
							<p>{ticket.description}</p>
						</div>
						<div className="text-xs text-muted-foreground mt-1">{formatDate(ticket.createdAt)}</div>
					</div>
				</div>

				{/* AI Analysis */}
				<div className="flex items-start gap-3">
					<Avatar>
						<AvatarFallback>
							<Sparkles className="h-4 w-4" />
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<div className="font-semibold">AI Assistant</div>
						<div className="space-y-2">
							<div className="bg-accent/10 border-l-4 border-accent p-3 rounded-r-lg text-sm">
								<strong>Refined Request:</strong>
								<p className="mt-1">{aiResponse.refinedRequest}</p>
							</div>
							<div className="bg-accent/10 border-l-4 border-accent p-3 rounded-r-lg text-sm">
								<strong>Possible Solution:</strong>
								<pre className="whitespace-pre-wrap font-sans mt-1">{aiResponse.possibleSolution}</pre>
							</div>
							<div className="bg-accent/10 border-l-4 border-accent p-3 rounded-r-lg text-sm">
								<strong>Suggested Articles:</strong>
								<ul className="mt-2 space-y-2">
									{aiResponse.suggestedArticles.map((article) => (
										<li key={article.id}>
											<Link href={`/knowledge-base/${article.id}`} passHref>
												<Button variant="link" className="p-0 h-auto">
													{article.title}
												</Button>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="text-xs text-muted-foreground mt-1">{formatDate(ticket.createdAt)} (auto-generated)</div>
					</div>
				</div>

				{/* Internal Notes */}
				{internalNotes.map((note, index) => (
					<div key={index} className="flex items-start gap-3">
						<Avatar>
							<AvatarFallback>
								<Lightbulb className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="font-semibold">Internal Note (AI)</div>
							<div className="bg-yellow-100/40 border-l-4 border-yellow-400 p-3 rounded-r-lg text-sm text-yellow-900">
								<p>{note}</p>
							</div>
							<div className="text-xs text-muted-foreground mt-1">Just now (Visible only to analysts)</div>
						</div>
					</div>
				))}
			</div>

			{/* Chat Input */}
			<div className="mt-auto pt-4 border-t">
				<div className="space-y-2">
					<Textarea
						placeholder="Type your message to the user..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						rows={3}
					/>
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<Button onClick={handleSuggestApproach} variant="ghost" size="icon" title="Suggest Approach">
								<Lightbulb className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon" title="Attach File">
								<Paperclip className="h-4 w-4" />
							</Button>
						</div>
						<Button onClick={handleSendMessage} disabled={!comment.trim()}>
							<Send className="h-4 w-4 mr-2" />
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
