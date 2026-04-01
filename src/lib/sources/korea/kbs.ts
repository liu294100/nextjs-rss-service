import { createRssSourceProcessor } from '../rss-source';

export const kbsProcessor = createRssSourceProcessor({
  name: 'kbs',
  displayName: 'KBS',
  description: 'KBS World News',
  websiteUrl: 'https://world.kbs.co.kr',
  feedUrl: 'https://world.kbs.co.kr/rss/rss_news.htm?lang=e',
});
