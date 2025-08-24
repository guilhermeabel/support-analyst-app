"use client"

import { useTicketStore } from "@/store/ticket-store"
import { TicketDetailContent } from "./ticket-detail-content"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function TicketPanel() {
	const { openTickets, activeTicketId, setActiveTicket, closeTicket } = useTicketStore()

	const activeTicket = openTickets.find((ticket) => ticket.id === activeTicketId)

	if (!activeTicket) {
		return (
			<aside className="h-full flex items-center justify-center text-muted-foreground">
				<p>No ticket selected</p>
			</aside>
		)
	}

	return (
		<aside className="h-full flex flex-col">
			<div className="flex-shrink-0 border-b">
				<div className="flex items-center gap-2 p-2 overflow-x-auto">
					{openTickets.map((ticket) => (
						<div
							key={ticket.id}
							onClick={() => setActiveTicket(ticket.id)}
							className={cn(
								"flex items-center gap-2 p-2 rounded-md cursor-pointer text-xs flex-shrink-0",
								activeTicketId === ticket.id ? "bg-muted" : "hover:bg-muted/50",
							)}
						>
							<span className="font-mono">{ticket.id}</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-5 w-5"
								onClick={(e) => {
									e.stopPropagation()
									closeTicket(ticket.id)
								}}
							>
								<X className="h-3 w-3" />
							</Button>
						</div>
					))}
				</div>
			</div>
			<div className="flex-1 overflow-auto">
				<TicketDetailContent ticket={activeTicket} />
			</div>
		</aside>
	)
}
