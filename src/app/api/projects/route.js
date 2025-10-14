import { getAllProjects } from '@/lib/getProjects';

export async function GET() {
  const projects = getAllProjects();
  const sortedProjects = projects.sort((a, b) => {
    return (a.order || 999) - (b.order || 999);
  });
  return Response.json(projects);
}