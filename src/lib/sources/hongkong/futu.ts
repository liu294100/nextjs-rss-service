import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem, SourceProcessor } from '../types';

const FUTU_NEWS_URL = 'https://news.futunn.com/main';

const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
};

function normalizeTitle(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

export const futuProcessor: SourceProcessor = {
  name: 'futu',
  displayName: '富途牛牛',
  description: '富途牛牛财经新闻',
  websiteUrl: FUTU_NEWS_URL,
  section: '香港',
  fetchFeed: async (): Promise<NewsItem[]> => {
    try {
      const response = await axios.get(FUTU_NEWS_URL, {
        headers: REQUEST_HEADERS,
      });
      const $ = cheerio.load(response.data);
      const results: NewsItem[] = [];
      const seen = new Set<string>();

      $('a[href*="/post/"]').each((_, element) => {
        const href = $(element).attr('href')?.trim();
        if (!href) {
          return;
        }
        const link = new URL(href, FUTU_NEWS_URL).href;
        if (seen.has(link)) {
          return;
        }
        const title = normalizeTitle($(element).text());
        if (!title) {
          return;
        }
        seen.add(link);
        results.push({
          title,
          link,
          description: title,
          date: new Date(),
        });
      });

      return results;
    } catch (error) {
      console.error(`Error fetching Futu feed: ${error}`);
      return [];
    }
  },
};
