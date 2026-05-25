export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      status: false,
      error: "Missing required parameter: text"
    });
  }

  try {
    const response = await fetch(`https://api.nexray.eu.cc/ai/copilot?text=${encodeURIComponent(text)}`, {
      method: "GET",
      headers: {
        "User-Agent": "Nexus-Free-API"
      }
    });

    const data = await response.json();

    return res.status(200).json({
      status: true,
      author: "@NexusDev",
      query: text,
      result: data.result || data.answer || data.response || data,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      error: "Failed to fetch from upstream API",
      details: err.message
    });
  }
}
