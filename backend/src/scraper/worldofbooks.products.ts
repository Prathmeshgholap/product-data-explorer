import { chromium } from 'playwright';

export async function scrapeFictionProducts() {
  const browser = await chromium.launch({
    headless: true,   // 👈 IMPORTANT: browser visible
    slowMo: 50,
  });

  const page = await browser.newPage();

  await page.goto(
    'https://www.worldofbooks.com/en-gb/pages/fiction',
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  // Let JS load
  await page.waitForTimeout(5000);

  const products = await page.$$eval(
    'a.full-unstyled-link.product-card',
    (links) =>
      links.map((el) => ({
        title: el.textContent?.trim() || '',
        source_id: el.getAttribute('href'),
        source_url: 'https://www.worldofbooks.com' + el.getAttribute('href'),
      })),
  );

  console.log('PRODUCT LINKS FOUND:', products.length);

  await browser.close();
  return products;
}
