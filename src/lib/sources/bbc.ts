import { createRssSourceProcessor } from './rss-source';

export const bbcProcessor = createRssSourceProcessor({
  name: 'bbc',
  displayName: 'BBC News',
  description: 'BBC News World',
  websiteUrl: 'https://www.bbc.com/news',
  feedUrl: 'https://feeds.bbci.co.uk/news/world/rss.xml',
});
