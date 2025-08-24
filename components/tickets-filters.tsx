"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { groups, priorities, statuses } from "@/lib/mock-data"

interface TicketsFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedGroup: string
  onGroupChange: (group: string) => void
  selectedPriority: string
  onPriorityChange: (priority: string) => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  onClearFilters: () => void
}

export function TicketsFilters({
  searchQuery,
  onSearchChange,
  selectedGroup,
  onGroupChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
}: TicketsFiltersProps) {
  const hasActiveFilters =
    selectedGroup !== "All" || selectedPriority !== "All" || selectedStatus !== "All" || searchQuery

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tickets by subject, description, or user..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <Select value={selectedGroup} onValueChange={onGroupChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPriority} onValueChange={onPriorityChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority === "All" ? "All" : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "All" ? "All" : status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="px-3 bg-transparent">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
