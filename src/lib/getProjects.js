import fs from 'fs';
import path from 'path';

/**
 * Get all projects from /src/projects/ folder
 * Reads all data.json files and returns array of projects
 */
export function getAllProjects() {
  try {
    // Get the absolute path to the projects directory
    const projectsDirectory = path.join(process.cwd(), 'src', 'projects');
    
    // Check if the directory exists
    if (!fs.existsSync(projectsDirectory)) {
      console.warn('Projects directory not found:', projectsDirectory);
      return [];
    }
    
    // Read all folder names in the projects directory
    const projectFolders = fs.readdirSync(projectsDirectory);
    
    // Filter out any files, keep only directories
    const projectDirectories = projectFolders.filter(folder => {
      const folderPath = path.join(projectsDirectory, folder);
      return fs.statSync(folderPath).isDirectory();
    });
    
    // Map through each project folder and read its data.json
    const allProjects = projectDirectories.map(folderName => {
      const dataPath = path.join(projectsDirectory, folderName, 'data.json');
      
      // Check if data.json exists
      if (!fs.existsSync(dataPath)) {
        console.warn(`data.json not found in ${folderName}`);
        return null;
      }
      
      // Read and parse the JSON file
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      const projectData = JSON.parse(fileContents);
      
      return projectData;
    });
    
    // Filter out any null values (folders without data.json)
    const validProjects = allProjects.filter(project => project !== null);
    
    return validProjects;
    
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

/**
 * Get projects filtered by category
 * @param {string} category - Category to filter by ('all', 'uiux', 'branding', etc.)
 */
export function getProjectsByCategory(category) {
  const allProjects = getAllProjects();
  
  if (category === 'all') {
    return allProjects;
  }
  
  return allProjects.filter(project => project.category === category);
}