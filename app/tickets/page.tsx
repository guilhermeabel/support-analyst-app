"use client"

import { useState, useMemo } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { TicketsFilters } from "@/components/tickets-filters"
import { TicketsTable } from "@/components/tickets-table"
import { TicketDetailModal } from "@/components/ticket-detail-modal"
import { mockTickets, type Ticket } from "@/lib/mock-data"

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const matchesSearch =
        searchQuery === "" ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesGroup = selectedGroup === "All" || ticket.group === selectedGroup
      const matchesPriority = selectedPriority === "All" || ticket.priority === selectedPriority
      const matchesStatus = selectedStatus === "All" || ticket.status === selectedStatus

      return matchesSearch && matchesGroup && matchesPriority && matchesStatus
    })
  }, [searchQuery, selectedGroup, selectedPriority, selectedStatus])

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedGroup("All")
    setSelectedPriority("All")
    setSelectedStatus("All")
  }

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  const handleStatusChange = (ticketId: string, newStatus: Ticket["status"]) => {
    // In a real app, this would update the backend
    console.log(`Updating ticket ${ticketId} to status: ${newStatus}`)
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Open Tickets</h1>
              <p className="text-muted-foreground">
                Manage all incoming support tickets organized by group and priority. Click on any ticket to view
                details.
              </p>
            </div>

            <TicketsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedGroup={selectedGroup}
              onGroupChange={setSelectedGroup}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onClearFilters={handleClearFilters}
            />

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTickets.length} of {mockTickets.length} tickets
              </p>
            </div>

            <TicketsTable tickets={filteredTickets} onTicketClick={handleTicketClick} />
          </div>
        </div>
      </main>

      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
