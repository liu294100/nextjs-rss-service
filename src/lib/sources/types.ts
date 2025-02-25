export interface NewsItem {
  title: string;
  link: string;
  description: string;
  date: Date;
  author?: string;
  categories?: string[];
  imageUrl?: string;
}

export interface SourceProcessor {
  name: string;
  displayName: string;
  description: string;
  websiteUrl: string;
  fetchFeed: () => Promise<NewsItem[]>;
}