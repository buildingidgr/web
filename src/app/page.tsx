import Link from 'next/link'
import { fetchProjects } from '@/utils/api'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
  const projects = await fetchProjects()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Necha Project Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.type} - {project.subtype}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Priority:</strong> {project.priority}</p>
              <p><strong>Status:</strong> {project.status}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/project/${project.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link href="/create-project">Create New Project</Link>
        </Button>
      </div>
    </div>
  )
}

