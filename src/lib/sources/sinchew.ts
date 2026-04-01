import { createRssSourceProcessor } from './rss-source';

export const sinChewProcessor = createRssSourceProcessor({
  name: 'sinchew',
  displayName: '星洲日报',
  description: '星洲日报新闻聚合',
  websiteUrl: 'https://www.sinchew.com.my',
  feedUrl: 'https://news.google.com/rss/search?q=site:sinchew.com.my&hl=zh-CN&gl=MY&ceid=MY:zh-Hans',
  section: '马来西亚',
});
