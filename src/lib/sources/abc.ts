import { createRssSourceProcessor } from './rss-source';

export const abcProcessor = createRssSourceProcessor({
  name: 'abc',
  displayName: 'ABC News Australia',
  description: 'ABC Top Stories',
  websiteUrl: 'https://www.abc.net.au/news',
  feedUrl: 'https://www.abc.net.au/news/feed/51120/rss.xml',
});
