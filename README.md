# Support Analyst Dashboard

This is a web application built for support analysts at an Infrastructure-as-a-Service company. It provides a centralized dashboard to view, manage, and analyze support tickets.

## Features

- **Dashboard**: Get a high-level overview of key metrics like open tickets, average response time, and unassigned tickets. A chart displays ticket inflow over time.
- **All Tickets**: View all incoming tickets, with powerful filtering by group, tag, and priority.
- **My Tickets**: A personalized view showing only the tickets assigned to you.
- **Detailed Ticket View**: Click on any ticket to open a detailed modal view.
- **AI Assistant**: The ticket detail view includes an AI-powered assistant that provides a refined version of the user's request and suggests a possible solution.
- **Knowledge Base**: A dedicated section for documentation and articles (placeholder).
- **Settings**: Manage your account preferences (placeholder).

## Tech Stack

- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- [Recharts](https://recharts.org/) - Charting library

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- pnpm

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/your_username/support-analyst-app.git
   ```

2. Install PNPM packages

   ```sh
   pnpm install
   ```

3. Start the development server

   ```sh
   pnpm dev
   ```

Now, open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
