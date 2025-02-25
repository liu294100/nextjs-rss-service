import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem, SourceProcessor } from './types';

const BBC_NEWS_URL = 'https://www.bbc.com/news';

export const bbcProcessor: SourceProcessor = {
  name: 'bbc',
  displayName: 'BBC News',
  description: 'BBC News RSS Feed',
  websiteUrl: BBC_NEWS_URL,
  
  fetchFeed: async (): Promise<NewsItem[]> => {
    try {
      const response = await axios.get(BBC_NEWS_URL);
      const $ = cheerio.load(response.data);
      const newsItems: NewsItem[] = [];

      // 根据BBC网站结构解析新闻条目
      // 这里需要根据BBC新闻页面的实际HTML结构进行调整
      $('.gs-c-promo').each((_, element) => {
        const titleElement = $(element).find('.gs-c-promo-heading__title');
        const title = titleElement.text().trim();
        const link = $(element).find('a.gs-c-promo-heading').attr('href');
        
        if (title && link) {
          const fullLink = link.startsWith('http') ? link : `https://www.bbc.com${link}`;
          const description = $(element).find('.gs-c-promo-summary').text().trim() || title;
          const date = new Date();

          newsItems.push({
            title,
            link: fullLink,
            description,
            date,
          });
        }
      });

      return newsItems;
    } catch (error) {
      console.error(`Error fetching BBC feed: ${error}`);
      return [];
    }
  }
};