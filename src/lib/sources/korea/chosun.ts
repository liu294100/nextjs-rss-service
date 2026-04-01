import { createRssSourceProcessor } from '../rss-source';

export const chosunProcessor = createRssSourceProcessor({
  name: 'chosun',
  displayName: '朝鲜日报',
  description: '朝鲜日报 RSS',
  websiteUrl: 'https://www.chosun.com',
  feedUrl: 'https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml',
  section: '韩国',
});
