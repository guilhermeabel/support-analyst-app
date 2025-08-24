"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { TicketPanel } from "@/components/ticket-panel"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useTicketStore } from "@/store/ticket-store"

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const openTickets = useTicketStore((state) => state.openTickets)
	const isPanelOpen = openTickets.length > 0

	return (
		<div className="flex h-screen bg-background">
			<SidebarNav />
			<ResizablePanelGroup direction="horizontal" className="flex-1">
				<ResizablePanel defaultSize={isPanelOpen ? 60 : 100}>{children}</ResizablePanel>
				{isPanelOpen && (
					<>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={40} minSize={30} maxSize={50}>
							<TicketPanel />
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>
		</div>
	)
}
