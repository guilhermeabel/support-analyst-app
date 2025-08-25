import { TicketDetailContent } from "@/components/ticket-detail-content"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTickets } from "@/lib/mock-data"
import { ArrowLeft, FileText, Clock } from "lucide-react"
import Link from "next/link"

export default function ArchivedTicketPage({ params }: { params: { ticketId: string } }) {
	const ticket = mockTickets.find((ticket) => ticket.id === params.ticketId)

	if (!ticket) {
		return (
			<main className="flex-1 p-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-3xl font-bold">Ticket not found</h1>
					<p className="text-muted-foreground mt-2">
						The ticket you are looking for does not exist or has been moved.
					</p>
					<Link href="/archive" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
						<ArrowLeft className="h-4 w-4" />
						Back to Archive
					</Link>
				</div>
			</main>
		)
	}

	return (
		<main className="flex-1 overflow-auto h-screen">
			<div className="p-8">
				<div className="max-w-7xl mx-auto">
					<Link
						href="/archive"
						className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:underline"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Archive
					</Link>

					{ticket.finalizationSummary && (
						<div className="border rounded-lg p-6 mb-6">
							<div className="flex items-center gap-3 mb-4">
								<FileText className="h-6 w-6" />
								<h2 className="text-xl font-semibold">Finalization Report</h2>
							</div>
							<Separator />
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 text-sm">
								<div className="md:col-span-1 space-y-1">
									<h3 className="font-semibold text-muted-foreground">Hours Taken</h3>
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4" />
										<p className="text-lg font-bold">{ticket.hoursTaken}</p>
									</div>
								</div>
								<div className="md:col-span-2 space-y-4">
									<div>
										<h3 className="font-semibold text-muted-foreground mb-1">Root Cause</h3>
										<p className="whitespace-pre-wrap leading-relaxed">{ticket.rootCause}</p>
									</div>
									<Separator />
									<div>
										<h3 className="font-semibold text-muted-foreground mb-1">Summary of Actions</h3>
										<div className="prose prose-sm max-w-none">
											<p className="whitespace-pre-wrap leading-relaxed">{ticket.finalizationSummary}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					<TicketDetailContent ticket={ticket} isArchived={true} />
				</div>
			</div>
		</main>
	)
}
