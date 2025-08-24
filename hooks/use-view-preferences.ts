"use client"

import { useState, useEffect } from "react"

type ViewMode = "kanban" | "table"

interface ViewPreferences {
	viewMode: ViewMode
}

const isBrowser = typeof window !== "undefined"

export function useViewPreferences() {
	const [preferences, setPreferences] = useState<ViewPreferences>(() => {
		if (!isBrowser) {
			return { viewMode: "kanban" }
		}
		try {
			const item = window.localStorage.getItem("viewPreferences")
			return item ? JSON.parse(item) : { viewMode: "kanban" }
		} catch (error) {
			console.error(error)
			return { viewMode: "kanban" }
		}
	})

	useEffect(() => {
		if (isBrowser) {
			try {
				window.localStorage.setItem("viewPreferences", JSON.stringify(preferences))
			} catch (error) {
				console.error(error)
			}
		}
	}, [preferences])

	const setViewMode = (viewMode: ViewMode) => {
		setPreferences((prev) => ({ ...prev, viewMode }))
	}

	return {
		...preferences,
		setViewMode,
	}
}
