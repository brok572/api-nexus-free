import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const apiDir = path.join(process.cwd(), 'api');
    
    if (!fs.existsSync(apiDir)) {
      return res.json({status: true, categories: []});
    }

    const categories = {};

    function scan(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          scan(fullPath);
        } else if (item.name.endsWith('.js') && !['categories.js', 'endpoints.js'].includes(item.name)) {
          const relPath = path.relative(apiDir, fullPath);
          const route = '/' + relPath.replace(/\.js$/, '').replace(/\\/g, '/');
          const parts = route.split('/').filter(Boolean);
          
          if (parts.length >= 2) {
            const cat = parts[0];
            const name = parts[1];
            
            if (!categories[cat]) {
              categories[cat] = {
                slug: cat,
                name: cat.charAt(0).toUpperCase() + cat.slice(1),
                desc: cat.charAt(0).toUpperCase() + cat.slice(1) + ' APIs',
                count: 0
              };
            }
            categories[cat].count++;
          }
        }
      }
    }

    scan(apiDir);
    
    const result = Object.values(categories);
    res.json({status: true, categories: result});
    
  } catch (e) {
    res.status(500).json({status: false, error: e.message});
  }
      }
