import { Feed } from 'feed';
import { SourceProcessor, NewsItem } from './sources/types';

export async function generateRssFeed(source: SourceProcessor): Promise<string> {
  try {
    const newsItems = await source.fetchFeed();
    
    // 创建新的Feed实例
    const feed = new Feed({
      title: source.displayName,
      description: source.description,
      id: source.websiteUrl,
      link: source.websiteUrl,
      language: 'en',
      favicon: `${source.websiteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      updated: new Date(),
      feedLinks: {
        rss: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/rss/${source.name}`
      },
    });

    // 添加条目
    newsItems.forEach((item: NewsItem) => {
      feed.addItem({
        title: item.title,
        id: item.link,
        link: item.link,
        description: item.description,
        date: item.date,
        ...(item.author && { author: [{ name: item.author }] }),
        ...(item.imageUrl && { image: item.imageUrl }),
      });
    });

    // 生成RSS 2.0格式
    return feed.rss2();
  } catch (error) {
    console.error(`Error generating RSS feed for ${source.name}: ${error}`);
    throw error;
  }
}