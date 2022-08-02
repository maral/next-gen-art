import fs from 'fs'
import path from 'path'

const projectsDirectory = path.join(process.cwd(), 'pages', 'projects')

export function getSortedProjects() {
  const files = fs.readdirSync(projectsDirectory, { withFileTypes: true })
  return files
    .filter((file) => file.isDirectory())
    .filter((file) => file.name.indexOf('_') != -1)
    .map((dir) => {
      let title = dir.name
        .split('_')[1]
        .split('-')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ')

      return {
        id: dir.name,
        title,
      }
    })
    .sort((a, b) => a.id.localeCompare(b.id))
}
