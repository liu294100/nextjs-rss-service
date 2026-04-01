import { createRssSourceProcessor } from './rss-source';

export const bloombergProcessor = createRssSourceProcessor({
  name: 'bloomberg',
  displayName: 'Bloomberg',
  description: 'Bloomberg Markets News',
  websiteUrl: 'https://www.bloomberg.com',
  feedUrl: 'https://feeds.bloomberg.com/markets/news.rss',
});
