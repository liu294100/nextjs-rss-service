import { createRssSourceProcessor } from './rss-source';

export const cctvProcessor = createRssSourceProcessor({
  name: 'cctv',
  displayName: 'CCTV',
  description: 'CCTV China News',
  websiteUrl: 'https://english.cctv.com',
  feedUrl: 'https://english.cctv.com/rss/newschina.xml',
  section: '中国',
});
