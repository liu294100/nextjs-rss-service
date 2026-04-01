import { createRssSourceProcessor } from './rss-source';

export const ftProcessor = createRssSourceProcessor({
  name: 'ft',
  displayName: 'Financial Times',
  description: 'Financial Times World News',
  websiteUrl: 'https://www.ft.com',
  feedUrl: 'https://www.ft.com/world?format=rss',
});
