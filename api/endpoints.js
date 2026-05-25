import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { category } = req.query;
  const dir = path.join(process.cwd(), 'api', category);
  if (!fs.existsSync(dir)) return res.status(404).json({status: false});
  
  const endpoints = fs.readdirSync(dir)
    .filter(f => f.endsWith('.js'))
    .map(f => ({
      method: 'GET',
      path: `/${category}/${f.replace('.js','')}`,
      name: f.replace('.js',''),
      desc: f.replace('.js','') + ' endpoint',
      params: [{name: 'text', required: false, desc: 'Input'}]
    }));
    
  res.json({status: true, category: category.toUpperCase(), endpoints});
}
