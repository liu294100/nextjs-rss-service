import { createRssSourceProcessor } from './rss-source';

export const sankeiProcessor = createRssSourceProcessor({
  name: 'sankei',
  displayName: '产经新闻',
  description: '产经新闻聚合',
  websiteUrl: 'https://www.sankei.com',
  feedUrl: 'https://news.google.com/rss/search?q=site:sankei.com&hl=ja&gl=JP&ceid=JP:ja',
  section: '日本',
});
