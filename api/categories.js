import { config } from './config.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const categories = Object.keys(config.categories).map(key => ({
    slug: key,
    name: config.categories[key].name,
    desc: config.categories[key].desc,
    count: config.categories[key].endpoints.length
  }));

  res.status(200).json({status:true,categories});
}
