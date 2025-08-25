"use client"

import { TicketsTable } from "@/components/tickets-table"
import { mockTickets } from "@/lib/mock-data"

export default function ArchivePage() {
	const archivedTickets = mockTickets.filter((ticket) => ticket.status === "done")

	return (
		<main className="flex-1 overflow-auto h-screen">
			<div className="p-8">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-4">
						<div>
							<h1 className="text-3xl font-bold">Archived Tickets</h1>
							<p className="text-muted-foreground">Browse and review closed tickets.</p>
						</div>
						<TicketsTable tickets={archivedTickets} isArchive={true} />
					</div>
				</div>
			</div>
		</main>
	)
}
