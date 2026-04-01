import { createRssSourceProcessor } from '../rss-source';

export const france24Processor = createRssSourceProcessor({
  name: 'france24',
  displayName: 'France 24',
  description: 'France 24 News',
  websiteUrl: 'https://www.france24.com',
  feedUrl: 'https://www.france24.com/en/rss',
  section: '法国',
});
