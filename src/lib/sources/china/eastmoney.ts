import { createRssSourceProcessor } from '../rss-source';

export const eastMoneyProcessor = createRssSourceProcessor({
  name: 'eastmoney',
  displayName: '东方财富',
  description: '东方财富新闻聚合',
  websiteUrl: 'https://www.eastmoney.com',
  feedUrl: 'https://news.google.com/rss/search?q=site:eastmoney.com&hl=en-US&gl=US&ceid=US:en',
  section: '中国',
});
