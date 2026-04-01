import { createRssSourceProcessor } from '../rss-source';

export const nhkProcessor = createRssSourceProcessor({
  name: 'nhk',
  displayName: 'NHK',
  description: 'NHK News',
  websiteUrl: 'https://www3.nhk.or.jp/news/',
  feedUrl: 'https://www3.nhk.or.jp/rss/news/cat0.xml',
});
