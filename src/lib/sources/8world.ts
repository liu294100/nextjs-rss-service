import { createRssSourceProcessor } from './rss-source';

export const world8Processor = createRssSourceProcessor({
  name: '8world',
  displayName: '新加坡8频道',
  description: '8world 新闻聚合',
  websiteUrl: 'https://www.8world.com',
  feedUrl: 'https://news.google.com/rss/search?q=site:8world.com&hl=zh-CN&gl=SG&ceid=SG:zh-Hans',
  section: '新加坡',
});
