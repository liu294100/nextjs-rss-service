import { createRssSourceProcessor } from '../rss-source';

export const asahiProcessor = createRssSourceProcessor({
  name: 'asahi',
  displayName: '朝日新闻',
  description: '朝日新闻头条',
  websiteUrl: 'https://www.asahi.com',
  feedUrl: 'https://www.asahi.com/rss/asahi/newsheadlines.rdf',
  section: '日本',
});
