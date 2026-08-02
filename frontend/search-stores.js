import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  console.log("Installing dependencies...");
  execSync('npm install', { stdio: 'inherit' });
  console.log("Building...");
  execSync('npm run build', { stdio: 'inherit' });
  
  const distDir = path.join(process.cwd(), 'dist');
  
  function searchStores(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        searchStores(fullPath);
      } else if (fullPath.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('stores')) {
          console.log(`Found 'stores' in ${fullPath}`);
          // Print surrounding context
          const idx = content.indexOf('stores');
          console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 100)));
        }
      }
    }
  }
  
  console.log("Searching for 'stores' in dist...");
  searchStores(distDir);
} catch (e) {
  console.error(e);
}
