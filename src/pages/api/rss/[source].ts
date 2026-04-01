import { NextApiRequest, NextApiResponse } from 'next';
import { getSourceByName } from '@/lib/sources';
import { generateRssFeed } from '@/lib/rss';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { source } = req.query;
  
  if (!source || typeof source !== 'string') {
    return res.status(400).json({ error: 'Source parameter is required' });
  }

  try {
    const sourceProcessor = getSourceByName(source);
    
    if (!sourceProcessor) {
      return res.status(404).json({ error: `Source "${source}" not found` });
    }

    const rssContent = await generateRssFeed(sourceProcessor);

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="feed.xml"');
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1200');

    res.status(200).send(Buffer.from(rssContent, 'utf-8'));
  } catch (error) {
    console.error(`Error processing RSS request: ${error}`);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}
