import { createRssSourceProcessor } from '../rss-source';

export const cnnProcessor = createRssSourceProcessor({
  name: 'cnn',
  displayName: 'CNN',
  description: 'CNN Top Stories',
  websiteUrl: 'https://edition.cnn.com',
  feedUrl: 'http://rss.cnn.com/rss/edition.rss',
});
