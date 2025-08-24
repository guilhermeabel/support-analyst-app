"use client"

import { useState, useMemo } from "react"
import { TicketsFilters } from "@/components/tickets-filters"
import { TicketsTable } from "@/components/tickets-table"
import { mockTickets } from "@/lib/mock-data"
import { useTicketStore } from "@/store/ticket-store"

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const openTicket = useTicketStore((state) => state.openTicket)

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

  return (
    <main className="flex-1 overflow-auto h-screen">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Open Tickets</h1>
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

          <TicketsTable tickets={filteredTickets} onTicketClick={openTicket} />
        </div>
      </div>
    </main>
  )
}
