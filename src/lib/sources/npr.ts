import { createRssSourceProcessor } from './rss-source';

export const nprProcessor = createRssSourceProcessor({
  name: 'npr',
  displayName: 'NPR',
  description: 'NPR Top News',
  websiteUrl: 'https://www.npr.org',
  feedUrl: 'https://feeds.npr.org/1001/rss.xml',
  section: '美国',
});
