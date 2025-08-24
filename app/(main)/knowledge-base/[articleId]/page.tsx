
import { mockKnowledgeBaseItems, KnowledgeBaseItem } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ArticlePage({ params }: { params: { articleId: string } }) {
	const article = mockKnowledgeBaseItems.find((item) => item.id === params.articleId)

	if (!article) {
		return (
			<main className="flex-1 overflow-auto h-screen p-8">
				<div className="max-w-4xl mx-auto">
					<Link href="/knowledge-base" className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
						<ArrowLeft className="h-4 w-4" />
						Back to Knowledge Base
					</Link>
					<h1 className="text-3xl font-bold">Article not found</h1>
					<p className="text-muted-foreground mt-2">
						The article you are looking for does not exist or has been moved.
					</p>
				</div>
			</main>
		)
	}

	return (
		<main className="flex-1 overflow-auto h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<Link href="/knowledge-base" className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
					<ArrowLeft className="h-4 w-4" />
					Back to Knowledge Base
				</Link>
				<div className="space-y-6">
					<div className="space-y-2">
						<h1 className="text-4xl font-bold">{article.title}</h1>
						<p className="text-lg text-muted-foreground">{article.description}</p>
					</div>
					<div className="flex flex-wrap gap-2">
						{article.tags.map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Article Content</CardTitle>
						</CardHeader>
						<CardContent className="prose max-w-none">
							<p>
								This is a placeholder for the full article content. In a real application, this would be fetched from a
								CMS or a database and could include rich text, images, and code snippets rendered from Markdown.
							</p>
							<h4>Key Steps:</h4>
							<ul>
								<li>Diagnose the root cause of the issue.</li>
								<li>Follow the troubleshooting guide provided.</li>
								<li>Document the resolution steps for future reference.</li>
							</ul>
							<pre>
								<code>
									{`
  // Example code snippet
  function diagnoseConnectivity() {
    console.log("Pinging database server...");
    // ... implementation details
  }
                  `}
								</code>
							</pre>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}
