import { createRssSourceProcessor } from './rss-source';

export const chinaPressProcessor = createRssSourceProcessor({
  name: 'chinapress',
  displayName: '中国报',
  description: '马来西亚中国报新闻聚合',
  websiteUrl: 'https://www.chinapress.com.my',
  feedUrl: 'https://news.google.com/rss/search?q=site:chinapress.com.my&hl=zh-CN&gl=MY&ceid=MY:zh-Hans',
  section: '马来西亚',
});
