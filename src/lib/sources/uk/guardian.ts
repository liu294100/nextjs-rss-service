import { createRssSourceProcessor } from '../rss-source';

export const guardianProcessor = createRssSourceProcessor({
  name: 'guardian',
  displayName: 'The Guardian',
  description: 'Guardian World News',
  websiteUrl: 'https://www.theguardian.com',
  feedUrl: 'https://www.theguardian.com/world/rss',
  section: '英国',
});
