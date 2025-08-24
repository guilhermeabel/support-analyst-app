export type { Ticket, User, KnowledgeBaseItem }

interface User {
  name: string
  email: string
  initials: string
}

interface KnowledgeBaseItem {
  id: string
  title: string
  description: string
  category: string
  type: string
  tags: string[]
  lastUpdated: string
  views: number
  rating: number
  estimatedReadTime: string
}

export const mockUsers: User[] = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    initials: "SC",
  },
  {
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    initials: "MJ",
  },
  {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    initials: "AR",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@company.com",
    initials: "ED",
  },
  {
    name: "Robert Wilson",
    email: "robert.wilson@company.com",
    initials: "RW",
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    initials: "LT",
  },
  {
    name: "David Brown",
    email: "david.brown@company.com",
    initials: "DB",
  },
  {
    name: "Jennifer Lee",
    email: "jennifer.lee@company.com",
    initials: "JL",
  },
]

export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Database connection timeout in production",
    description:
      "Our main application database is experiencing frequent connection timeouts during peak hours. This is affecting user login and data retrieval operations. The issue started approximately 3 hours ago and is impacting roughly 30% of our user base.",
    user: {
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      initials: "SC",
    },
    assignee: {
      name: "John Doe",
      email: "john.doe@company.com",
      initials: "JD",
    },
    tags: ["database", "production", "timeout"],
    priority: "critical",
    status: "doing",
    group: "Infrastructure",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
  },
  {
    id: "TKT-002",
    subject: "Storage quota exceeded for backup system",
    description:
      "The automated backup system has reached its storage limit and is failing to create new backups. We need to either increase the storage allocation or implement a cleanup policy for older backups.",
    user: {
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      initials: "MJ",
    },
    tags: ["storage", "backup", "quota"],
    priority: "high",
    status: "todo",
    group: "Storage",
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "TKT-003",
    subject: "Network latency issues in EU region",
    description:
      "Users in the European region are reporting slow response times when accessing our services. Average response time has increased from 200ms to 2.5s over the past 24 hours.",
    user: {
      name: "Alex Rodriguez",
      email: "alex.rodriguez@company.com",
      initials: "AR",
    },
    assignee: {
      name: "Jane Smith",
      email: "jane.smith@company.com",
      initials: "JS",
    },
    tags: ["network", "latency", "eu-region"],
    priority: "medium",
    status: "in_review",
    group: "Network",
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "TKT-004",
    subject: "SSL certificate renewal required",
    description:
      "The SSL certificate for our main domain expires in 7 days. We need to renew it to avoid service disruption.",
    user: {
      name: "Emily Davis",
      email: "emily.davis@company.com",
      initials: "ED",
    },
    tags: ["ssl", "certificate", "security"],
    priority: "medium",
    status: "backlog",
    group: "Security",
    createdAt: "2024-01-14T14:10:00Z",
    updatedAt: "2024-01-14T14:10:00Z",
  },
  {
    id: "TKT-005",
    subject: "Backup restoration failed for client data",
    description:
      "Attempted to restore client data from last week's backup but the process failed with error code 500. Client is requesting urgent resolution as they've lost critical business data.",
    user: {
      name: "Robert Wilson",
      email: "robert.wilson@company.com",
      initials: "RW",
    },
    tags: ["backup", "restoration", "client-data"],
    priority: "critical",
    status: "todo",
    group: "Storage",
    createdAt: "2024-01-15T07:45:00Z",
    updatedAt: "2024-01-15T07:45:00Z",
  },
  {
    id: "TKT-006",
    subject: "API rate limiting not working correctly",
    description:
      "The API rate limiting mechanism is allowing more requests than configured. This could lead to service degradation during high traffic periods.",
    user: {
      name: "Lisa Thompson",
      email: "lisa.thompson@company.com",
      initials: "LT",
    },
    tags: ["api", "rate-limiting", "performance"],
    priority: "medium",
    status: "backlog",
    group: "API",
    createdAt: "2024-01-14T11:30:00Z",
    updatedAt: "2024-01-14T11:30:00Z",
  },
  {
    id: "TKT-007",
    subject: "Monitoring alerts not being sent",
    description:
      "System monitoring alerts have stopped being sent to the operations team. The last alert was received 2 days ago, but we know there have been issues that should have triggered alerts.",
    user: {
      name: "David Brown",
      email: "david.brown@company.com",
      initials: "DB",
    },
    assignee: {
      name: "John Doe",
      email: "john.doe@company.com",
      initials: "JD",
    },
    tags: ["monitoring", "alerts", "operations"],
    priority: "high",
    status: "doing",
    group: "Monitoring",
    createdAt: "2024-01-13T15:20:00Z",
    updatedAt: "2024-01-15T10:15:00Z",
  },
  {
    id: "TKT-008",
    subject: "Load balancer configuration update needed",
    description:
      "Need to update load balancer configuration to handle increased traffic from new product launch. Current configuration is causing uneven distribution.",
    user: {
      name: "Jennifer Lee",
      email: "jennifer.lee@company.com",
      initials: "JL",
    },
    tags: ["load-balancer", "configuration", "traffic"],
    priority: "low",
    status: "backlog",
    group: "Infrastructure",
    createdAt: "2024-01-12T13:45:00Z",
    updatedAt: "2024-01-12T13:45:00Z",
  },
]

export const mockKnowledgeBaseItems: KnowledgeBaseItem[] = [
  {
    id: "kb-001",
    title: "How to fix a broken database connection",
    description:
      "This guide will help you troubleshoot and resolve common database connection issues. From connection timeouts to authentication errors, we've got you covered.",
    category: "Database",
    type: "Troubleshooting",
    tags: ["database", "connection", "troubleshooting"],
    lastUpdated: "2024-01-15T10:00:00Z",
    views: 1200,
    rating: 4.5,
    estimatedReadTime: "5 min",
  },
  {
    id: "kb-002",
    title: "Understanding API rate limiting",
    description:
      "Learn about API rate limiting, its importance, and how to configure it effectively to prevent service degradation during high traffic periods.",
    category: "API",
    type: "Documentation",
    tags: ["api", "rate-limiting", "documentation"],
    lastUpdated: "2024-01-14T10:00:00Z",
    views: 800,
    rating: 4.0,
    estimatedReadTime: "4 min",
  },
  {
    id: "kb-003",
    title: "Common SSL certificate errors and solutions",
    description:
      "A comprehensive list of SSL certificate errors you might encounter and their solutions. From expired certificates to certificate mismatch errors, we've got you covered.",
    category: "Security",
    type: "Troubleshooting",
    tags: ["ssl", "certificate", "security", "troubleshooting"],
    lastUpdated: "2024-01-13T10:00:00Z",
    views: 1500,
    rating: 4.8,
    estimatedReadTime: "6 min",
  },
  {
    id: "kb-004",
    title: "How to optimize application performance",
    description:
      "Discover key strategies for improving your application's performance, including caching, database optimization, and code optimization.",
    category: "Performance",
    type: "Best Practices",
    tags: ["performance", "optimization", "best-practices"],
    lastUpdated: "2024-01-12T10:00:00Z",
    views: 1000,
    rating: 4.2,
    estimatedReadTime: "3 min",
  },
  {
    id: "kb-005",
    title: "Introduction to load balancing",
    description:
      "A beginner's guide to load balancing, its benefits, and how to implement it effectively to distribute traffic across multiple servers.",
    category: "Infrastructure",
    type: "Documentation",
    tags: ["load-balancing", "documentation", "introduction"],
    lastUpdated: "2024-01-11T10:00:00Z",
    views: 900,
    rating: 4.1,
    estimatedReadTime: "2 min",
  },
]

export const groups = ["All", "Infrastructure", "Storage", "Network", "Security", "API", "Monitoring"]
export const priorities = ["All", "low", "medium", "high", "critical"]
export const statuses = ["All", "backlog", "todo", "doing", "in_review", "done"]
