import { $ } from 'zx'
import fs from 'fs/promises'
import path from 'path'

async function replaceInFiles(dir) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = await fs.stat(fullPath)
    if (stat.isDirectory()) {
      await replaceInFiles(fullPath)
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = await fs.readFile(fullPath, 'utf8')
      let newContent = content
        .replace(/school-yellow/g, 'school-red')
        .replace(/bg-school-red text-school-black/g, 'bg-school-red text-white')
        .replace(/hover:bg-school-red text-school-black/g, 'hover:bg-school-red hover:text-white text-school-black')
      
      if (content !== newContent) {
         await fs.writeFile(fullPath, newContent)
         console.log(`Updated ${fullPath}`)
      }
    }
  }
}

await replaceInFiles('./app')
await replaceInFiles('./components')
