import { createRssSourceProcessor } from './rss-source';

export const foxNewsProcessor = createRssSourceProcessor({
  name: 'foxnews',
  displayName: 'Fox News',
  description: 'Fox News Latest',
  websiteUrl: 'https://www.foxnews.com',
  feedUrl: 'https://moxie.foxnews.com/google-publisher/latest.xml',
});
