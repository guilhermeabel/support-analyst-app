"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
	AlertCircle,
	Sparkles,
	Lightbulb,
	Paperclip,
	Send,
	FileText,
	List,
	Loader2,
	CircleDashed,
	Circle,
	CheckCircle2,
} from "lucide-react"
import type { Ticket } from "@/lib/mock-data"
import { Separator } from "./ui/separator"
import Link from "next/link"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const statuses: Ticket["status"][] = ["backlog", "todo", "doing", "in_review", "done"]

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

// Mock AI for finalization report
const generateFinalizationReport = (ticket: Ticket) => {
	return {
		rootCause: `Based on the investigation, the root cause was identified as a misconfiguration in the client's firewall, which was blocking access to the new storage bucket.`,
		summary: `1. Initial Investigation: Verified user's report and checked application logs for errors.\n2. AI Suggestion: The AI assistant suggested checking VPC flow logs, which pointed towards a security group issue.\n3. Resolution: Corrected the firewall rules to whitelist the application server's IP range. Verified with the user that access was restored.`,
	}
}

// Data structure for status styles and icons
const statusConfig = {
	backlog: {
		label: "Backlog",
		icon: CircleDashed,
		color: "text-gray-500",
		dotColor: "bg-gray-400",
	},
	todo: { label: "To Do", icon: Circle, color: "text-blue-500", dotColor: "bg-blue-500" },
	doing: {
		label: "Doing",
		icon: Loader2,
		color: "text-purple-500",
		dotColor: "bg-purple-500",
	},
	in_review: {
		label: "In Review",
		icon: List,
		color: "text-orange-500",
		dotColor: "bg-orange-500",
	},
	done: {
		label: "Done",
		icon: CheckCircle2,
		color: "text-green-500",
		dotColor: "bg-green-500",
	},
}

interface TicketDetailContentProps {
	ticket: Ticket
	onStatusChange?: (ticketId: string, newStatus: Ticket["status"]) => void
	isArchived?: boolean
}

export function TicketDetailContent({ ticket, onStatusChange, isArchived = false }: TicketDetailContentProps) {
	const [comment, setComment] = useState("")
	const [internalNotes, setInternalNotes] = useState<string[]>([])
	const [isKbDialogOpen, setIsKbDialogOpen] = useState(false)
	const [isFinalizeDialogOpen, setIsFinalizeDialogOpen] = useState(false)
	const [currentStatus, setCurrentStatus] = useState(ticket.status)
	const [finalizationData, setFinalizationData] = useState({
		hoursTaken: "",
		rootCause: generateFinalizationReport(ticket).rootCause,
		summary: generateFinalizationReport(ticket).summary,
	})
	const { toast } = useToast()

	const aiResponse = generateAIResponse(ticket)
	const aiFinalizationReport = generateFinalizationReport(ticket)

	const handleStatusChange = (newStatus: Ticket["status"]) => {
		if (newStatus === "done") {
			setIsFinalizeDialogOpen(true)
		} else {
			setCurrentStatus(newStatus)
			if (onStatusChange) {
				onStatusChange(ticket.id, newStatus)
			}
			toast({
				title: "Status Updated",
				description: `Ticket status changed to ${newStatus.replace("_", " ")}.`,
			})
		}
	}

	const handleFinalizationSubmit = () => {
		if (!finalizationData.hoursTaken || !finalizationData.rootCause || !finalizationData.summary) {
			toast({
				title: "Incomplete Report",
				description: "Please fill out all fields before closing the ticket.",
				variant: "destructive",
			})
			return
		}

		// In a real app, you'd send this data to your backend
		console.log("Finalization Report Submitted:", {
			ticketId: ticket.id,
			...finalizationData,
		})

		// Update status and close modal
		setCurrentStatus("done")
		if (onStatusChange) {
			onStatusChange(ticket.id, "done")
		}
		setIsFinalizeDialogOpen(false)

		toast({
			title: "Ticket Closed",
			description: "The finalization report has been saved.",
		})
	}

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

	const currentStatusInfo = statusConfig[currentStatus]

	return (
		<>
			<div className="flex flex-col h-full p-6">
				<div className="space-y-4 pb-4">
					<div className="flex items-start justify-between">
						<div>
							<h2 className="text-xl font-bold">{ticket.subject}</h2>
							<p className="text-sm font-mono text-muted-foreground mt-1">{ticket.id}</p>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="outline" className={`${getPriorityColor(ticket.priority)} text-xs`}>
								{ticket.priority.toUpperCase()}
							</Badge>
							{!isArchived && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm" className="flex items-center gap-2">
											<div className={cn("h-2 w-2 rounded-full", currentStatusInfo.dotColor)} />
											<span>{currentStatusInfo.label}</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{Object.entries(statusConfig).map(([statusKey, { label, icon: Icon, color, dotColor }]) => {
											if (statusKey === "done") return null
											return (
												<DropdownMenuItem
													key={statusKey}
													onSelect={() => handleStatusChange(statusKey as Ticket["status"])}
													className="flex items-center gap-2"
												>
													<Icon className={cn("h-4 w-4", color)} />
													<span>{label}</span>
												</DropdownMenuItem>
											)
										})}
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onSelect={() => handleStatusChange("done")}
											className="flex items-center gap-2 text-green-600 focus:text-green-700 focus:bg-green-50"
										>
											<CheckCircle2 className="h-4 w-4" />
											<span>Close Ticket</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</div>
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

				{/* Chat Input or Archive Actions */}
				<div className="mt-auto pt-4 border-t">
					{isArchived ? (
						<div className="flex justify-end">
							<Dialog open={isKbDialogOpen} onOpenChange={setIsKbDialogOpen}>
								<DialogTrigger asChild>
									<Button>
										<FileText className="h-4 w-4 mr-2" />
										Generate Knowledge Base Entry
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[625px]">
									<DialogHeader>
										<DialogTitle>Create Knowledge Base Entry</DialogTitle>
										<DialogDescription>
											Review and edit the ticket details below to create a new knowledge base article.
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="title" className="text-right">
												Title
											</Label>
											<Input id="title" defaultValue={ticket.subject} className="col-span-3" />
										</div>
										<div className="grid grid-cols-4 items-start gap-4">
											<Label htmlFor="content" className="text-right mt-2">
												Content
											</Label>
											<Textarea id="content" defaultValue={ticket.description} className="col-span-3" rows={8} />
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="category" className="text-right">
												Category
											</Label>
											<Select defaultValue={ticket.group}>
												<SelectTrigger className="col-span-3">
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Infrastructure">Infrastructure</SelectItem>
													<SelectItem value="Storage">Storage</SelectItem>
													<SelectItem value="Network">Network</SelectItem>
													<SelectItem value="Security">Security</SelectItem>
													<SelectItem value="API">API</SelectItem>
													<SelectItem value="Monitoring">Monitoring</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="tags" className="text-right">
												Tags
											</Label>
											<Input id="tags" defaultValue={ticket.tags.join(", ")} className="col-span-3" />
										</div>
									</div>
									<DialogFooter>
										<Button type="submit" onClick={() => setIsKbDialogOpen(false)}>
											Save to Knowledge Base
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					) : (
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
					)}
				</div>
			</div>

			{/* Finalization Report Dialog */}
			<Dialog open={isFinalizeDialogOpen} onOpenChange={setIsFinalizeDialogOpen}>
				<DialogContent className="sm:max-w-[625px]">
					<DialogHeader>
						<DialogTitle>Finalize Ticket Report</DialogTitle>
						<DialogDescription>
							Please review and complete the report below before closing the ticket. The AI has generated a draft based
							on the ticket's history.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="hours" className="text-right">
								Hours Taken
							</Label>
							<Input
								id="hours"
								type="number"
								placeholder="e.g., 2.5"
								className="col-span-3"
								value={finalizationData.hoursTaken}
								onChange={(e) => setFinalizationData({ ...finalizationData, hoursTaken: e.target.value })}
							/>
						</div>
						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="rootCause" className="text-right mt-2">
								Root Cause
							</Label>
							<Textarea
								id="rootCause"
								defaultValue={finalizationData.rootCause}
								className="col-span-3"
								rows={4}
								onChange={(e) => setFinalizationData({ ...finalizationData, rootCause: e.target.value })}
							/>
						</div>
						<div className="grid grid-cols-4 items-start gap-4">
							<Label htmlFor="summary" className="text-right mt-2">
								Summary
							</Label>
							<Textarea
								id="summary"
								defaultValue={finalizationData.summary}
								className="col-span-3"
								rows={8}
								onChange={(e) => setFinalizationData({ ...finalizationData, summary: e.target.value })}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" onClick={handleFinalizationSubmit}>
							Submit & Close Ticket
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
