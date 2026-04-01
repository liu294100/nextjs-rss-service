import { createRssSourceProcessor } from './rss-source';

export const yahooFinanceProcessor = createRssSourceProcessor({
  name: 'yahoo-finance',
  displayName: 'Yahoo 财经',
  description: 'Yahoo Finance Top Stories',
  websiteUrl: 'https://finance.yahoo.com',
  feedUrl: 'https://finance.yahoo.com/rss/topstories',
  section: '美国',
});
