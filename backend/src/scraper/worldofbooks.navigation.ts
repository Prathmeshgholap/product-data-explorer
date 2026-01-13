import { PlaywrightCrawler } from 'crawlee';

export async function scrapeWorldOfBooksNavigation(): Promise<
  { title: string; slug: string; sourceUrl: string }[]
> {
  const results: { title: string; slug: string; sourceUrl: string }[] = [];

  const crawler = new PlaywrightCrawler({
    maxRequestsPerCrawl: 1,
    requestHandlerTimeoutSecs: 60,
    async requestHandler({ page }) {
      await page.goto('https://www.worldofbooks.com/', {
        waitUntil: 'domcontentloaded',
      });

      // Broad but safe selectors for nav links
      const links = await page.$$(
        'nav a, header a'
      );

      for (const a of links) {
        const title = (await a.innerText()).trim();
        const href = await a.getAttribute('href');

        if (
          title &&
          href &&
          title.length > 2 &&
          href.startsWith('/')
        ) {
          results.push({
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            sourceUrl: `https://www.worldofbooks.com${href}`,
          });
        }
      }
    },
  });

  await crawler.run(['https://www.worldofbooks.com/']);
  return results;
}
