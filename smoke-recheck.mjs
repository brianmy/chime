import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

// Re-check 1: Variant A nav tab → landing page
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Variant A")');
await page.waitForTimeout(300);
await page.click('a:has-text("Team events")');
await page.waitForURL('**/team-events', { timeout: 5000 });
await page.waitForLoadState('networkidle');
const s1 = await page.screenshot();
writeFileSync('/tmp/recheck-01-varA-landing.png', s1);
console.log('✓ Variant A landing page');

// Re-check 2: Variant B CTA → search results
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Variant B")');
await page.waitForTimeout(300);
await page.click('button:has-text("Find team event spaces")');
await page.waitForURL('**/team-events/search**', { timeout: 5000 });
await page.waitForLoadState('networkidle');
const s2 = await page.screenshot();
writeFileSync('/tmp/recheck-02-varB-cta.png', s2);
console.log('✓ Variant B CTA → search results');

// Re-check 3: search form submit from landing page
await page.goto('http://localhost:3000/team-events');
await page.waitForLoadState('networkidle');
await page.fill('input[id="search-where"]', 'San Francisco, CA');
await page.fill('input[id="search-teamsize"]', '20');
await page.selectOption('select[id="search-eventtype"]', 'Offsite retreat');
await page.click('button:has-text("Search")');
await page.waitForURL('**/team-events/search**', { timeout: 5000 });
await page.waitForLoadState('networkidle');
const s3 = await page.screenshot();
writeFileSync('/tmp/recheck-03-search-results.png', s3);
console.log('✓ Search form → results page');

await browser.close();
console.log('\nRe-check complete.');
