# prompt

Build a web application for support analysts at an Infra-as-a-Service company. The app should be built with latest versions of Next.js, TypeScript, React, TailwindCSS, and shadcn/ui components

Requirements
Navigation (sidebar menu on the left)

Dashboard (Home icon) → default landing page with high-level metrics.

Groups / Open Tickets (List icon) → shows all incoming tickets by group.

My Tickets (User icon) → focused view with tickets assigned to the logged-in analyst.

Knowledge Base (Book icon) → placeholder page for company docs / RAG integration.

Settings (Cog icon) → account preferences.

The sidebar should visually suggest a flow of work (dashboard → tickets → my work → knowledge base → settings).

Dashboard Page

Show useful analyst metrics in cards, using shadcn components:

Number of open tickets.

Average response time (SLA).

Number of tickets with no owners (unassigned).

Display a small chart or timeline (Recharts or similar) with ticket inflow over time.

Tickets Page

List of open tickets, filterable by group, tag, or priority.

Each ticket shows:

Subject / short request text.

User who opened it.

Tags (like "storage", "network", "backup").

Status (backlog, todo, doing, in review, done).

Clicking a ticket opens a modal drawer with full ticket details on the right.

My Tickets (Focused Tab)

Shows only the tickets assigned to the logged-in analyst.

Supports the same drawer modal interaction as the Tickets Page.

Ticket Details (Modal)

Display ticket data (user, tags, status, creation date).

Show AI Assistant section:

“Refined Request” → improved version of the original ticket text.

“Possible Solution” → AI-suggested solution from knowledge base (mock this for now).

Buttons for updating ticket status (move across Kanban stages).

Trigger automated actions depending on the status stage (placeholder, e.g., when moving to "Done", show a success confirmation).

Other Considerations

Use clean, modern UI with shadcn/ui cards, tables, and modal drawers.

Provide good defaults for responsive layout.

Use a fake in-memory data store or mocked JSON for tickets and users.
