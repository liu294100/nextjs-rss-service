import { createRssSourceProcessor } from './rss-source';

export const japanTimesProcessor = createRssSourceProcessor({
  name: 'japantimes',
  displayName: 'The Japan Times',
  description: 'Japan Times News',
  websiteUrl: 'https://www.japantimes.co.jp',
  feedUrl: 'https://www.japantimes.co.jp/feed/',
  section: '日本',
});
