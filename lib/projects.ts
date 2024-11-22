import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string;
  name: string;
  type: string;
  subtype: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  startDate: string;
  estimatedCompletionDate: string;
  location: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    address: string;
  };
  budget: {
    allocated: number;
    currency: string;
  };
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  createdAt: string;
}

class ProjectService {
  private projects: Map<string, Project> = new Map();

  createProject(projectData: Omit<Project, 'id' | 'createdAt'>): Project {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const newProject: Project = { ...projectData, id, createdAt, status: 'planning' };
    this.projects.set(id, newProject);
    return newProject;
  }

  getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  updateProject(id: string, updateData: Partial<Project>): Project | undefined {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  deleteProject(id: string): boolean {
    return this.projects.delete(id);
  }
}

export const projectService = new ProjectService();
