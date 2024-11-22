import { NextResponse } from 'next/server'

let projects: any[] = []

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const project = await request.json()
  project.id = Date.now().toString()
  projects.push(project)
  return NextResponse.json(project, { status: 201 })
}

export async function PUT(request: Request) {
  const { id, ...updateData } = await request.json()
  const index = projects.findIndex(p => p.id === id)
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updateData }
    return NextResponse.json(projects[index])
  }
  return NextResponse.json({ error: 'Project not found' }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  const index = projects.findIndex(p => p.id === id)
  if (index !== -1) {
    const [deletedProject] = projects.splice(index, 1)
    return NextResponse.json(deletedProject)
  }
  return NextResponse.json({ error: 'Project not found' }, { status: 404 })
}

