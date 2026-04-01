export interface NewsItem {
  title: string;
  link: string;
  description: string;
  date: Date;
  author?: string;
  categories?: string[];
  imageUrl?: string;
}

// In types.ts
export interface SourceProcessor {
  name: string;
  displayName: string;
  description: string;
  websiteUrl: string;
  section?: string; // Add this
  fetchFeed: () => Promise<NewsItem[]>;
}