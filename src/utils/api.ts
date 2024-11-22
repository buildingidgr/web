export async function fetchProjects(): Promise<any[]> {
  const response = await fetch('/api/projects')
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
}

export async function createProject(projectData: any): Promise<any> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  })
  if (!response.ok) {
    throw new Error('Failed to create project')
  }
  return response.json()
}

export async function updateProject(id: string, projectData: any): Promise<any> {
  const response = await fetch('/api/projects', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...projectData }),
  })
  if (!response.ok) {
    throw new Error('Failed to update project')
  }
  return response.json()
}

export async function deleteProject(id: string): Promise<any> {
  const response = await fetch('/api/projects', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  if (!response.ok) {
    throw new Error('Failed to delete project')
  }
  return response.json()
}

