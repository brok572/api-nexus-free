import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { category } = req.query;
  if (!category) return res.status(400).json({status: false, error: 'Missing category'});

  try {
    const dir = path.join(process.cwd(), 'api', category);
    
    if (!fs.existsSync(dir)) {
      return res.json({status: true, category, endpoints: []});
    }

    const files = fs.readdirSync(dir);
    const endpoints = files
      .filter(f => f.endsWith('.js'))
      .map(f => {
        const name = f.replace('.js', '');
        return {
          method: 'GET',
          path: `/api/${category}/${name}`,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          desc: `Chat dengan ${name} AI`,
          params: [{name: 'text', required: true, desc: 'Your message'}]
        };
      });

    res.json({status: true, category: category.toUpperCase(), endpoints});
    
  } catch (e) {
    res.status(500).json({status: false, error: e.message});
  }
}
