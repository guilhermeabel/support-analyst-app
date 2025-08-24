"use client"

import { useState, useMemo } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { TicketsFilters } from "@/components/tickets-filters"
import { TicketsTable } from "@/components/tickets-table"
import { TicketDetailModal } from "@/components/ticket-detail-modal"
import { MyTicketsStats } from "@/components/my-tickets-stats"
import { MyTicketsKanban } from "@/components/my-tickets-kanban"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"
import { mockTickets, type Ticket } from "@/lib/mock-data"

// Current logged-in user (John Doe based on sidebar)
const CURRENT_USER = {
  name: "John Doe",
  email: "john.doe@company.com",
  initials: "JD",
}

export default function MyTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")

  // Filter tickets assigned to current user
  const myTickets = useMemo(() => {
    return mockTickets.filter((ticket) => ticket.assignee?.name === CURRENT_USER.name)
  }, [])

  const filteredTickets = useMemo(() => {
    return myTickets.filter((ticket) => {
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
  }, [myTickets, searchQuery, selectedGroup, selectedPriority, selectedStatus])

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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-foreground mb-2">My Tickets</h1>
                  <p className="text-muted-foreground">
                    Focus on tickets assigned specifically to you. Track your progress and manage your workload.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "kanban" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                  >
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Kanban
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                  >
                    <List className="h-4 w-4 mr-2" />
                    Table
                  </Button>
                </div>
              </div>
            </div>

            <MyTicketsStats tickets={myTickets} />

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
                Showing {filteredTickets.length} of {myTickets.length} assigned tickets
              </p>
            </div>

            {viewMode === "kanban" ? (
              <MyTicketsKanban tickets={filteredTickets} onTicketClick={handleTicketClick} />
            ) : (
              <TicketsTable tickets={filteredTickets} onTicketClick={handleTicketClick} />
            )}
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
