import axios from 'axios';
import * as cheerio from 'cheerio';
import { NewsItem, SourceProcessor } from './types';
import { parseRelativeDate } from '@/utils/parse-date'; // Import from your project
import timezone from '@/utils/timezone'; // Import from your project

//const ZAOBAO_URL = 'https://www.zaobao.com.sg'; 

const ZAOBAO_URL = 'https://www.zaobao.com';

export const zaobaoProcessor: SourceProcessor = {
    name: 'zaobao',
    displayName: 'Zaobao',
    description: 'Zaobao News',
    websiteUrl: ZAOBAO_URL,

    fetchFeed: async (): Promise<NewsItem[]> => {
        try {
            const response = await axios.get(ZAOBAO_URL + '/realtime/china', { // Example: China news
                responseType: 'arraybuffer', // For correct encoding
            });

            const decoder = new TextDecoder('utf-8'); // Or 'gbk', see below
            const htmlString = decoder.decode(response.data);
            const $ = cheerio.load(htmlString);

            const newsItems: NewsItem[] = [];

            // Select news items.  This is the MOST IMPORTANT part to adapt.
            let data = $('.card-listing .card');
            if (data.length === 0) {
                // for HK version
                data = $('.clearfix').find('.list-block');
            }


            for (const element of data.toArray()) {
                const $item = $(element);
                let link = $item.find('a').addBack('a').attr('href') || '';

                if (link[0] !== '/') {
                    // Handle interactive graphics (or other non-article links)
                    const title = $item.find('a').text().trim();
                    let dateNodes = $item.find('.meta-published-date');
                    if (dateNodes.length === 0) {
                      dateNodes = $item.find('.datestamp');
                    }
                    let dateString: string | undefined;
                    let pubDate: Date | undefined;
                    if (dateNodes.length !== 0) {
                        dateString = dateNodes.text().trim();
                        const dateParts = dateString.split('/');
                        dateParts.reverse();
                        dateString = dateParts.join('-');
                        const maybeDate = parseRelativeDate(dateString);
                        // zaobao seems always use UTC+8
                        if (maybeDate !== dateString) {
                            pubDate = timezone(maybeDate as Date, +8); // 确保 maybeDate 是 Date 类型
                        }
                    }


                    if (title && link) { //Basic validation
                        newsItems.push({
                            title,
                            link,
                            description: title, // Use title as description if no other available
                            date: pubDate || new Date(), // Use parsed date or current date
                        });
                    }
                    continue; // Skip to the next item
                }

                link = ZAOBAO_URL + link;

                try {
                  // Fetch the individual article page
                  const articleResponse = await axios.get(link, {
                      responseType: 'arraybuffer', // Handle encoding
                  });
                  const articleDecoder = new TextDecoder('utf-8'); // Or 'gbk'
                  const articleHtmlString = articleDecoder.decode(articleResponse.data);
                  const $1 = cheerio.load(articleHtmlString);


                  let title: string | undefined, time: Date | undefined;

                  if ($1('#seo-article-page').text() === '') {
                        // HK
                        title = $1('h1.article-title').text().trim();
                        //Use non-null assertion since we sure it won't be null;
                        time = new Date(JSON.parse($1("head script[type='application/ld+json']").eq(1).text()!)?.datePublished);
                    } else {
                        // SG
                        title = JSON.parse($1('#seo-article-page').text())['@graph'][0]?.headline;
                        time = new Date(JSON.parse($1('#seo-article-page').text())['@graph'][0]?.datePublished);
                    }

                    //Make sure the title exists
                    if(!title) {
                        continue;
                    }

                    $1('.overlay-microtransaction').remove();
                    $1('#video-freemium-player').remove();
                    $1('script').remove();
                    $1('.bff-google-ad').remove();


                  let articleBodyNode = $1('.articleBody');
                    if (articleBodyNode.length === 0) {
                        // for HK version
                        articleBodyNode = $1('.article-body');
                    }
                  const description = articleBodyNode.text().trim(); // Use article body text as a fallback


                  newsItems.push({
                      title,
                      link,
                      description: description.substring(0, 200), // Limit description length
                      date: time || new Date(), // Use parsed date, or current date as fallback
                  });

                } catch (articleError) {
                    console.error(`Error fetching article at ${link}:`, articleError);
                    //  Handle article fetch errors (e.g., 404, 500).  Don't add the item.
                    continue; // Skip to the next item
                }
            }


            return newsItems;

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Error fetching Zaobao feed: ${error.message}`, error.response?.status, error.response?.data);
            } else {
                console.error(`Error fetching Zaobao feed: ${error}`);
            }
            return [];
        }
    }
};