import { createRssSourceProcessor } from '../rss-source';

export const reutersProcessor = createRssSourceProcessor({
  name: 'reuters',
  displayName: 'Reuters',
  description: 'Reuters Headlines',
  websiteUrl: 'https://www.reuters.com',
  feedUrl: 'https://news.google.com/rss/search?q=site:reuters.com&hl=en-US&gl=US&ceid=US:en',
  section: '英国',
});
