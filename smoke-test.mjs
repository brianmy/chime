import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

const results = [];

const snap = async (label, path) => {
  const ss = await page.screenshot({ fullPage: false });
  writeFileSync(path, ss);
  results.push({ label, path });
};

// 1. Control — homepage
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');
await snap('Control — Homepage', '/tmp/snap-01-control-home.png');

// 2. Switch to Variant A
await page.click('button:has-text("Variant A")');
await page.waitForTimeout(300);
await snap('Variant A — Homepage (nav tab visible)', '/tmp/snap-02-varA-home.png');

// 3. Click Team events nav tab
await page.click('a:has-text("Team events")');
await page.waitForLoadState('networkidle');
await snap('Variant A — Team Events Landing', '/tmp/snap-03-varA-landing.png');

// 4. Click an event type card
await page.click('button:has-text("Offsite retreat")');
await page.waitForTimeout(300);
await snap('Variant A — Event type selected', '/tmp/snap-04-varA-card-selected.png');

// 5. Fill in search and submit
await page.fill('input[id="search-where"]', 'San Francisco, CA');
await page.fill('input[id="search-when"]', 'Oct 14–17');
await page.fill('input[id="search-teamsize"]', '20');
await page.click('button:has-text("Search")');
await page.waitForLoadState('networkidle');
await snap('Search Results — Default', '/tmp/snap-05-results-default.png');

// 6. Apply a filter chip
await page.click('button:has-text("Meeting space")');
await page.waitForTimeout(300);
await snap('Search Results — Filter applied', '/tmp/snap-06-results-filtered.png');

// 7. Show map placeholder
await page.click('button:has-text("Show map")');
await page.waitForTimeout(300);
await snap('Search Results — Map placeholder', '/tmp/snap-07-results-map.png');

// 8. Switch to Variant B homepage
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Variant B")');
await page.waitForTimeout(300);
await snap('Variant B — Homepage with editorial module', '/tmp/snap-08-varB-home.png');

// 9. Click editorial CTA
await page.click('button:has-text("Find team event spaces")');
await page.waitForLoadState('networkidle');
await snap('Variant B — CTA leads to search results', '/tmp/snap-09-varB-results.png');

await browser.close();

results.forEach(r => console.log(`✓ ${r.label} → ${r.path}`));
console.log('\nAll screenshots captured.');
