"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, FileText, Video, ExternalLink, Clock, Star, TrendingUp } from "lucide-react"

// Mock knowledge base data
const knowledgeBaseItems = [
  {
    id: "kb-001",
    title: "Database Connection Troubleshooting Guide",
    description:
      "Comprehensive guide for diagnosing and resolving database connectivity issues in production environments.",
    category: "Infrastructure",
    type: "guide",
    tags: ["database", "troubleshooting", "production"],
    lastUpdated: "2024-01-10",
    views: 245,
    rating: 4.8,
    estimatedReadTime: "8 min",
  },
  {
    id: "kb-002",
    title: "Storage Quota Management Best Practices",
    description:
      "Learn how to effectively manage storage quotas, implement cleanup policies, and monitor usage patterns.",
    category: "Storage",
    type: "guide",
    tags: ["storage", "quota", "cleanup", "monitoring"],
    lastUpdated: "2024-01-08",
    views: 189,
    rating: 4.6,
    estimatedReadTime: "12 min",
  },
  {
    id: "kb-003",
    title: "Network Latency Optimization Techniques",
    description: "Advanced techniques for identifying and resolving network latency issues across different regions.",
    category: "Network",
    type: "guide",
    tags: ["network", "latency", "optimization", "regions"],
    lastUpdated: "2024-01-05",
    views: 156,
    rating: 4.9,
    estimatedReadTime: "15 min",
  },
  {
    id: "kb-004",
    title: "SSL Certificate Management Workflow",
    description: "Step-by-step process for SSL certificate renewal, installation, and automated monitoring setup.",
    category: "Security",
    type: "workflow",
    tags: ["ssl", "certificates", "security", "automation"],
    lastUpdated: "2024-01-03",
    views: 203,
    rating: 4.7,
    estimatedReadTime: "10 min",
  },
  {
    id: "kb-005",
    title: "Backup and Recovery Procedures",
    description:
      "Complete backup and recovery procedures including validation, testing, and emergency restoration protocols.",
    category: "Storage",
    type: "procedure",
    tags: ["backup", "recovery", "validation", "emergency"],
    lastUpdated: "2023-12-28",
    views: 312,
    rating: 4.9,
    estimatedReadTime: "20 min",
  },
  {
    id: "kb-006",
    title: "API Rate Limiting Configuration",
    description: "How to properly configure and monitor API rate limiting to prevent service degradation.",
    category: "API",
    type: "guide",
    tags: ["api", "rate-limiting", "configuration", "monitoring"],
    lastUpdated: "2023-12-25",
    views: 134,
    rating: 4.5,
    estimatedReadTime: "6 min",
  },
]

const categories = ["All", "Infrastructure", "Storage", "Network", "Security", "API", "Monitoring"]
const types = ["All", "guide", "workflow", "procedure", "video"]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "guide":
      return <Book className="h-4 w-4" />
    case "workflow":
      return <TrendingUp className="h-4 w-4" />
    case "procedure":
      return <FileText className="h-4 w-4" />
    case "video":
      return <Video className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "guide":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "workflow":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "procedure":
      return "bg-green-100 text-green-800 border-green-200"
    case "video":
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const filteredItems = knowledgeBaseItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesType = selectedType === "All" || item.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <main className="flex-1 overflow-auto h-screen">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Base</h1>
            <p className="text-muted-foreground">
              Access comprehensive documentation, troubleshooting guides, and best practices for infrastructure
              support.
            </p>
          </div>

          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList>
              <TabsTrigger value="browse">Browse Articles</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
              <TabsTrigger value="recent">Recently Updated</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search knowledge base..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md text-sm bg-background"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md text-sm bg-background"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type === "All" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <Badge variant="outline" className={`text-xs ${getTypeColor(item.type)}`}>
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {item.rating}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.estimatedReadTime}
                            </div>
                            <span>{item.views} views</span>
                          </div>
                          <span>Updated {item.lastUpdated}</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Most Popular Articles</CardTitle>
                  <CardDescription>Top articles based on views and ratings from the support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {knowledgeBaseItems
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.views} views • {item.rating} rating
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recently Updated</CardTitle>
                  <CardDescription>Latest updates to our knowledge base articles and procedures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {knowledgeBaseItems
                      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                      .slice(0, 5)
                      .map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                          <div className="flex-shrink-0">{getTypeIcon(item.type)}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">Updated {item.lastUpdated}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
