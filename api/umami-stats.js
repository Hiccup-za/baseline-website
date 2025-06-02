export default async function handler(req, res) {
  const websiteId = process.env.UMAMI_WEBSITE_ID; // get Umami website ID from env
  const apiKey = process.env.UMAMI_API_KEY; // store your API key in Vercel env vars

  // All-time stats endpoint (no date range)
  const url = `https://cloud.umami.is/api/websites/${websiteId}/stats`;

  try {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });

    if (!response.ok) {
      // Log the status and response text for debugging
      const errorText = await response.text();
      console.error('Umami API error:', response.status, errorText);
      return res.status(500).json({ error: 'Failed to fetch stats', status: response.status, details: errorText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    // Log any network or runtime errors
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Fetch error', details: err.message });
  }
} 