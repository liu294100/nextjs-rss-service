import { createRssSourceProcessor } from './rss-source';

export const rthkProcessor = createRssSourceProcessor({
  name: 'rthk',
  displayName: 'RTHK',
  description: '香港电台新闻',
  websiteUrl: 'https://news.rthk.hk',
  feedUrl: 'https://rthk.hk/rthk/news/rss/e_expressnews_elocal.xml',
  section: '香港',
});
