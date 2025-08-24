import { create } from "zustand"
import type { Ticket } from "@/lib/mock-data"

interface TicketPanelState {
	openTickets: Ticket[]
	activeTicketId: string | null
	openTicket: (ticket: Ticket) => void
	closeTicket: (ticketId: string) => void
	setActiveTicket: (ticketId: string) => void
}

export const useTicketStore = create<TicketPanelState>((set) => ({
	openTickets: [],
	activeTicketId: null,
	openTicket: (ticket) =>
		set((state) => {
			if (state.openTickets.find((t) => t.id === ticket.id)) {
				return { activeTicketId: ticket.id }
			}
			return {
				openTickets: [...state.openTickets, ticket],
				activeTicketId: ticket.id,
			}
		}),
	closeTicket: (ticketId) =>
		set((state) => {
			const newTickets = state.openTickets.filter((t) => t.id !== ticketId)
			let newActiveId = state.activeTicketId
			if (state.activeTicketId === ticketId) {
				newActiveId = newTickets[newTickets.length - 1]?.id || null
			}
			return {
				openTickets: newTickets,
				activeTicketId: newActiveId,
			}
		}),
	setActiveTicket: (ticketId) => set({ activeTicketId: ticketId }),
}))
