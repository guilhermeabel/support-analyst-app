"use client"

import { useState, useMemo } from "react"
import { TicketsFilters } from "@/components/tickets-filters"
import { TicketsTable } from "@/components/tickets-table"
import { MyTicketsStats } from "@/components/my-tickets-stats"
import { MyTicketsKanban } from "@/components/my-tickets-kanban"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"
import { mockTickets, type Ticket } from "@/lib/mock-data"
import { useViewPreferences } from "@/hooks/use-view-preferences"
import { useTicketStore } from "@/store/ticket-store"

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
  const { viewMode, setViewMode } = useViewPreferences()
  const openTicket = useTicketStore((state) => state.openTicket)

  // Filter tickets assigned to current user
  const myTickets = useMemo(() => {
    return mockTickets.filter(
      (ticket) => ticket.assignee?.name === CURRENT_USER.name && ticket.status !== "done",
    )
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

  return (
    <main className="flex-1 overflow-auto h-screen">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">My Tickets</h1>
                <p className="text-muted-foreground">
                  Focus on tickets assigned specifically to you. Track your progress and manage your workload.
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>View Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={viewMode}
                    onValueChange={(value) => setViewMode(value as "kanban" | "table")}
                  >
                    <DropdownMenuRadioItem value="kanban">Kanban</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="table">Table</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <MyTicketsKanban tickets={filteredTickets} onTicketClick={openTicket} />
          ) : (
            <TicketsTable tickets={filteredTickets} onTicketClick={openTicket} />
          )}
        </div>
      </div>
    </main>
  )
}
