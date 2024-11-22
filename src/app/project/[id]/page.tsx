import { getProject } from '@/utils/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from 'next/navigation'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.type} - {project.subtype}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-muted-foreground">Priority</dt>
              <dd className="mt-1 text-sm text-foreground">{project.priority}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="mt-1 text-sm text-foreground">{project.status}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-muted-foreground">Description</dt>
              <dd className="mt-1 text-sm text-foreground">{project.description}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-muted-foreground">Start Date</dt>
              <dd className="mt-1 text-sm text-foreground">{new Date(project.startDate).toLocaleDateString()}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-muted-foreground">Estimated Completion Date</dt>
              <dd className="mt-1 text-sm text-foreground">{new Date(project.estimatedCompletionDate).toLocaleDateString()}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-muted-foreground">Location</dt>
              <dd className="mt-1 text-sm text-foreground">
                {project.location.address}<br />
                Lat: {project.location.coordinates.latitude}, Long: {project.location.coordinates.longitude}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-muted-foreground">Budget</dt>
              <dd className="mt-1 text-sm text-foreground">
                {project.budget.allocated} {project.budget.currency}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

