export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const { text } = req.query;
  
  if (!text) {
    return res.status(400).json({
      status: false,
      error: "Parameter 'text' is required"
    });
  }

  try {
    // Tunatumia api ya haraka ya QR
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
    
    res.json({
      status: true,
      query: text,
      qr_url: qrUrl,
      message: "Fungua qr_url kuona picha"
    });
    
  } catch (e) {
    res.status(500).json({
      status: false,
      error: e.message
    });
  }
}
