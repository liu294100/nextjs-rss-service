import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem, SourceProcessor } from './types';

interface RssSourceConfig {
  name: string;
  displayName: string;
  description: string;
  websiteUrl: string;
  feedUrl: string;
  section?: string;
}

const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
};

function toAbsoluteUrl(rawUrl: string, baseUrl: string): string {
  if (!rawUrl) {
    return baseUrl;
  }
  try {
    return new URL(rawUrl, baseUrl).href;
  } catch {
    return baseUrl;
  }
}

function parseDate(rawDate?: string): Date {
  if (!rawDate) {
    return new Date();
  }
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }
  return parsed;
}

function cleanText(input?: string): string {
  if (!input) {
    return '';
  }
  const text = cheerio.load(input).text();
  return text.replace(/\s+/g, ' ').trim();
}

function parseRssItem($item: cheerio.Cheerio<any>, websiteUrl: string): NewsItem | null {
  const title = cleanText($item.children('title').first().text());
  const linkText = $item.children('link').first().text().trim();
  const linkHref = $item.children('link').first().attr('href')?.trim() || '';
  const guid = $item.children('guid').first().text().trim();
  const rawLink = linkText || linkHref || guid;
  const link = toAbsoluteUrl(rawLink, websiteUrl);
  const descriptionRaw =
    $item.children('description').first().text() ||
    $item.children('content\\:encoded').first().text() ||
    $item.children('summary').first().text() ||
    title;
  const description = cleanText(descriptionRaw) || title;
  const pubDate =
    $item.children('pubDate').first().text().trim() ||
    $item.children('dc\\:date').first().text().trim() ||
    $item.children('published').first().text().trim();
  const author =
    cleanText($item.children('author').first().text()) ||
    cleanText($item.children('dc\\:creator').first().text()) ||
    undefined;
  const categories = $item
    .children('category')
    .toArray()
    .map((categoryNode) => cleanText(cheerio.load(categoryNode).text()))
    .filter(Boolean);
  const enclosureImage = $item.children('enclosure[type^="image"]').first().attr('url');
  const mediaContent = $item.children('media\\:content').first().attr('url');
  const mediaThumbnail = $item.children('media\\:thumbnail').first().attr('url');
  const imageUrl = enclosureImage || mediaContent || mediaThumbnail || undefined;

  if (!title || !rawLink) {
    return null;
  }

  return {
    title,
    link,
    description,
    date: parseDate(pubDate),
    author,
    categories: categories.length > 0 ? categories : undefined,
    imageUrl: imageUrl ? toAbsoluteUrl(imageUrl, websiteUrl) : undefined,
  };
}

function parseAtomEntry($entry: cheerio.Cheerio<any>, websiteUrl: string): NewsItem | null {
  const title = cleanText($entry.children('title').first().text());
  const alternateLink =
    $entry.children('link[rel="alternate"]').first().attr('href') ||
    $entry.children('link').first().attr('href') ||
    '';
  const link = toAbsoluteUrl(alternateLink, websiteUrl);
  const summaryRaw =
    $entry.children('summary').first().text() ||
    $entry.children('content').first().text() ||
    title;
  const description = cleanText(summaryRaw) || title;
  const rawDate =
    $entry.children('updated').first().text().trim() ||
    $entry.children('published').first().text().trim();
  const author =
    cleanText($entry.children('author').children('name').first().text()) ||
    cleanText($entry.children('author').first().text()) ||
    undefined;
  const categories = $entry
    .children('category')
    .toArray()
    .map((categoryNode) => {
      const term = cheerio.load(categoryNode).root().children().attr('term');
      return cleanText(term || cheerio.load(categoryNode).text());
    })
    .filter(Boolean);
  const mediaContent = $entry.children('media\\:content').first().attr('url');
  const mediaThumbnail = $entry.children('media\\:thumbnail').first().attr('url');
  const imageUrl = mediaContent || mediaThumbnail || undefined;

  if (!title || !alternateLink) {
    return null;
  }

  return {
    title,
    link,
    description,
    date: parseDate(rawDate),
    author,
    categories: categories.length > 0 ? categories : undefined,
    imageUrl: imageUrl ? toAbsoluteUrl(imageUrl, websiteUrl) : undefined,
  };
}

export async function fetchRssFeed(feedUrl: string, websiteUrl: string): Promise<NewsItem[]> {
  const response = await axios.get(feedUrl, {
    headers: REQUEST_HEADERS,
    responseType: 'text',
  });
  const xml = typeof response.data === 'string' ? response.data : String(response.data);
  const $ = cheerio.load(xml, { xmlMode: true });
  const items: NewsItem[] = [];
  const seen = new Set<string>();
  const rssItems = $('channel > item').toArray();
  const atomItems = $('feed > entry').toArray();

  for (const node of rssItems) {
    const parsed = parseRssItem($(node), websiteUrl);
    if (!parsed || seen.has(parsed.link)) {
      continue;
    }
    seen.add(parsed.link);
    items.push(parsed);
  }

  for (const node of atomItems) {
    const parsed = parseAtomEntry($(node), websiteUrl);
    if (!parsed || seen.has(parsed.link)) {
      continue;
    }
    seen.add(parsed.link);
    items.push(parsed);
  }

  return items;
}

export function createRssSourceProcessor(config: RssSourceConfig): SourceProcessor {
  return {
    name: config.name,
    displayName: config.displayName,
    description: config.description,
    websiteUrl: config.websiteUrl,
    section: config.section,
    fetchFeed: async () => fetchRssFeed(config.feedUrl, config.websiteUrl),
  };
}
