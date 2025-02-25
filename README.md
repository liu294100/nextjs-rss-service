# nextjs-rss-service

English / [简体中文](./README_CN.md)

```markdown
# Next.js RSS Aggregation Service Application

This project creates a complete Next.js application that aggregates news from CNN Lite and transforms it into a standard RSS format.  It's designed with an extensible architecture, making it easy to add more news sources.

## Key Features

- **Multi-Source Support:**  Modular design allows for easy addition of new website sources.
- **Dynamic Routing:** Leverages Next.js's dynamic API routes to support multiple websites.
- **Homepage Display:** The homepage lists all available RSS feeds and their corresponding links.
- **TypeScript Support:** Uses TypeScript for type safety.
- **Modern Configuration:** Built with Next.js 13.4.19 and specified Babel configurations.

## How to Use

1.  **Visit the Homepage:** Displays all available RSS feeds.

    Example: `https://your-domain.com/`

2.  **Access RSS Feeds:**

    - CNN Lite: `https://your-domain.com/api/rss/cnn`
    - After adding a new source (e.g., BBC): `https://your-domain.com/api/rss/bbc`

## How to Add a New Website

To add a new website source (e.g., BBC), you need to:

1.  Create a new source processor file (e.g., `src/lib/sources/bbc.ts`), following the examples in the code.
2.  Register this new source in `src/lib/sources/index.ts`.

No changes are required to the API routes or homepage code; the system will automatically detect and display newly added sources.

## Pre-Deployment Setup

Before deploying, you need to set the `NEXT_PUBLIC_BASE_URL` environment variable to your website's domain name, for example:

```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

This ensures that RSS links and other URLs are generated correctly.

This application is now ready to be deployed on any platform that supports Next.js, such as Vercel, Netlify, or your own server.

You can adjust the HTML parsing logic of the source processors as needed to accommodate structural changes in different websites.  The code provides an implementation for CNN Lite and an example framework for BBC.
```

