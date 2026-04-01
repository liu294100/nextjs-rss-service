import { createRssSourceProcessor } from './rss-source';

export const nytProcessor = createRssSourceProcessor({
  name: 'nyt',
  displayName: 'New York Times',
  description: 'New York Times Homepage',
  websiteUrl: 'https://www.nytimes.com',
  feedUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  section: '美国',
});
