import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem, SourceProcessor } from './types';

const CNN_LITE_URL = 'https://lite.cnn.com';

export const cnnProcessor: SourceProcessor = {
    name: 'cnn',
    displayName: 'CNN Lite',
    description: 'CNN Lite Article List', // Accurate description
    websiteUrl: CNN_LITE_URL,

    fetchFeed: async (): Promise<NewsItem[]> => {
        try {
            // 1. Fetch the HTML page as an arraybuffer
            const response = await axios.get(CNN_LITE_URL, {
                responseType: 'arraybuffer', // Crucial for encoding
            });

            // 2. Decode the arraybuffer using TextDecoder with UTF-8
            const decoder = new TextDecoder('utf-8');
            const htmlString = decoder.decode(response.data);

            // 3. Load into Cheerio (default HTML mode is fine)
            const $ = cheerio.load(htmlString);

            const newsItems: NewsItem[] = [];

            // 4. Parse the list items (li.card--lite)
            $('li.card--lite').each((_, element) => {
                const linkElement = $(element).find('a');
                const relativeLink = linkElement.attr('href'); 
                let title = linkElement.text().trim();

                //console.log("Raw HTML:", title);
                 // **Key Change: Manually decode HTML entities in the title**
                 title = title.replace(/'/g, "'")  // Replace ' with '
                 .replace(/"/g, '"') // Replace " with "
                 .replace(/&/g, '&')  // Replace & with &
                 .replace(/</g, '<')   // Replace < with <
                 .replace(/>/g, '>');  // Replace > with >

                // Filter out "Test alert headline (Test only)"
                if (title && relativeLink && title !== "Test alert headline (Test only)") {
                    const link = new URL(relativeLink, CNN_LITE_URL).href;
                    const description = title;  // Use title as description
                    const date = new Date(); // CNN Lite main page has no dates

                    newsItems.push({
                        title,
                        link,
                        description,
                        date,
                    });
                }
            });

            return newsItems;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Error fetching CNN feed: ${error.message}`, error.response?.status, error.response?.data);
            } else {
                console.error(`Error fetching CNN feed: ${error}`);
            }
            return [];
        }
    }
};