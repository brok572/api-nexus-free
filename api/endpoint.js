import { config } from './config.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const {category} = req.query;
  if(!category ||!config.categories[category]){
    return res.status(404).json({status:false,error:"Category not found"});
  }

  res.status(200).json({
    status:true,
    category:config.categories[category].name,
    endpoints:config.categories[category].endpoints
  });
}
