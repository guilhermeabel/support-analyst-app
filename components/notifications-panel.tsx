"use client"

import { useState } from "react"
import { mockNotifications, type Notification } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Bell, FileText, MessageSquare, X } from "lucide-react"

const notificationIcons = {
	new_ticket: <FileText className="h-4 w-4" />,
	new_message: <MessageSquare className="h-4 w-4" />,
	kb_update: <Bell className="h-4 w-4" />,
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	const now = new Date()
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

	if (diffInSeconds < 60) return `${diffInSeconds}s ago`
	const diffInMinutes = Math.floor(diffInSeconds / 60)
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`
	const diffInHours = Math.floor(diffInMinutes / 60)
	return `${diffInHours}h ago`
}

export function NotificationsPanel() {
	const [notifications, setNotifications] = useState(mockNotifications)

	const handleCloseNotification = (id: string) => {
		setNotifications(notifications.filter((notification) => notification.id !== id))
	}

	return (
		<div className="flex flex-col h-full">
			<h3 className="px-4 pt-2 text-sm font-semibold text-muted-foreground">Recent Activity</h3>
			{/* Fade-out effect container */}
			<div className="relative flex-1 mt-2">
				<div className="absolute top-0 h-8 w-full bg-gradient-to-b from-sidebar to-transparent z-10 pointer-events-none" />
				{/* Scrollable list, reversed */}
				<div className="absolute inset-0 overflow-y-auto">
					<div className="flex flex-col-reverse justify-start h-full p-4 pt-0">
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className={cn(
									"group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-sidebar-accent/50 mb-1 relative",
									!notification.read && "bg-sidebar-accent/80",
								)}
							>
								<div className="mt-1">{notificationIcons[notification.type]}</div>
								<div className="flex-1">
									<p className="text-sm font-medium">{notification.title}</p>
									<p className="text-xs text-muted-foreground">{notification.description}</p>
									<p className="text-xs text-muted-foreground mt-1">{formatDate(notification.createdAt)}</p>
								</div>
								<div className="flex flex-col items-center justify-center h-full">
									{!notification.read && (
										<div className="h-2 w-2 rounded-full bg-blue-500 transition-opacity group-hover:hidden" />
									)}
									<button
										onClick={() => handleCloseNotification(notification.id)}
										className="p-1 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-sidebar-accent hover:text-foreground"
									>
										<X className="h-3 w-3" />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="absolute bottom-0 h-8 w-full bg-gradient-to-t from-sidebar to-transparent z-10 pointer-events-none" />
			</div>
		</div>
	)
}
