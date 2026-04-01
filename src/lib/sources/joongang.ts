import { createRssSourceProcessor } from './rss-source';

export const joongangProcessor = createRssSourceProcessor({
  name: 'joongang',
  displayName: '中央日报',
  description: 'JoongAng News',
  websiteUrl: 'https://www.joongang.co.kr',
  feedUrl: 'https://rss.joins.com/joins_news_list.xml',
  section: '韩国',
});
