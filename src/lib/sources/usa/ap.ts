import { createRssSourceProcessor } from '../rss-source';

export const apProcessor = createRssSourceProcessor({
  name: 'ap',
  displayName: 'AP News',
  description: 'AP News Headlines',
  websiteUrl: 'https://apnews.com',
  feedUrl: 'https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en',
  section: '美国',
});
