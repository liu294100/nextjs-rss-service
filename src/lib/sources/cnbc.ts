import { createRssSourceProcessor } from './rss-source';

export const cnbcProcessor = createRssSourceProcessor({
  name: 'cnbc',
  displayName: 'CNBC',
  description: 'CNBC Top News',
  websiteUrl: 'https://www.cnbc.com',
  feedUrl: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
});
