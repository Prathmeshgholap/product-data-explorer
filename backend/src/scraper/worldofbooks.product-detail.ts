import { chromium } from 'playwright';

export async function scrapeProductDetail(url: string) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});

await page.waitForTimeout(5000);
// force render
await page.evaluate(() => window.scrollBy(0, window.innerHeight));
await page.waitForTimeout(3000);
    // Hard wait so Shopify finishes rendering
    await page.waitForTimeout(5000);

    // Scroll to force lazy-load
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
      const text = (sel: string) =>
        document.querySelector(sel)?.textContent?.trim() || null;

      return {
        description:
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content') || null,

        author: text('p.author.truncate-author'),

        price:
          text('span.price-item.price-item--regular') ||
          text('span.price-item'),

        // 🔥 ISBN from details table
        isbn:
          text('#info-isbn13') ||
          text('#info-isbn10'),

        ratings_avg: null,
        reviews_count: null,
      };
    });

    return data;
  } finally {
    await browser.close();
  }
}