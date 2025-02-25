import { NextApiRequest, NextApiResponse } from 'next';
import { getSourceByName } from '@/lib/sources';
import { generateRssFeed } from '@/lib/rss';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 获取请求的源名称
  const { source } = req.query;
  
  if (!source || typeof source !== 'string') {
    return res.status(400).json({ error: 'Source parameter is required' });
  }

  try {
    // 获取源处理器
    const sourceProcessor = getSourceByName(source);
    
    if (!sourceProcessor) {
      return res.status(404).json({ error: `Source "${source}" not found` });
    }

    // 生成RSS源
    const rssContent = await generateRssFeed(sourceProcessor);
    
    // 设置适当的内容类型和缓存控制
    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1200');
    
    // 发送RSS内容
    res.status(200).send(rssContent);
  } catch (error) {
    console.error(`Error processing RSS request: ${error}`);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}