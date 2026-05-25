import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const apiDir = path.join(process.cwd(), 'api');
  const categories = {};
  
  function scan(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) scan(fullPath);
      else if (file.name.endsWith('.js') && !['categories.js','endpoints.js'].includes(file.name)) {
        const route = '/' + path.relative(apiDir, fullPath).replace(/\.js$/, '').replace(/\\/g, '/');
        const parts = route.split('/').filter(Boolean);
        if (parts.length >= 2) {
          const cat = parts[0];
          if (!categories[cat]) categories[cat] = {name: cat, desc: cat + ' APIs', endpoints: []};
          categories[cat].endpoints.push({path: route});
        }
      }
    });
  }
  
  scan(apiDir);
  const result = Object.keys(categories).map(k => ({slug: k, name: k.toUpperCase(), desc: k + ' APIs', count: categories[k].endpoints.length}));
  res.json({status: true, categories: result});
        }
