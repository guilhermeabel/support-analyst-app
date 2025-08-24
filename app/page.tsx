import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { TicketInflowChart } from "@/components/ticket-inflow-chart"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to your support analyst dashboard. Here's an overview of your current workload and system
                metrics.
              </p>
            </div>

            <DashboardMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TicketInflowChart />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
