import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

// 1. Variant A landing — default (no event type selected, no coach marks hover)
await page.goto('http://localhost:3000/team-events');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Variant A")');
await page.waitForTimeout(400);
writeFileSync('/tmp/final-01-varA-landing-default.png', await page.screenshot());
console.log('✓ 1 Variant A landing — default listings');

// 2. Variant A — hover a coach mark to see tooltip
await page.hover('button[aria-label="Annotation 1: New first-class nav category"]');
await page.waitForTimeout(300);
writeFileSync('/tmp/final-02-varA-coachmark-tooltip.png', await page.screenshot());
console.log('✓ 2 Variant A — coach mark tooltip visible');

// 3. Variant A — click Workshop card, listings update
await page.dispatchEvent('body', 'mouseleave');
await page.waitForTimeout(200);
await page.goto('http://localhost:3000/team-events');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Variant A")');
await page.waitForTimeout(300);
await page.click('button:has-text("Workshop")');
await page.waitForTimeout(500);
writeFileSync('/tmp/final-03-varA-workshop-selected.png', await page.screenshot());
console.log('✓ 3 Variant A — Workshop selected, listings filtered');

// 4. Variant A — switch to Strategy session
await page.click('button:has-text("Strategy session")');
await page.waitForTimeout(500);
writeFileSync('/tmp/final-04-varA-strategy-selected.png', await page.screenshot());
console.log('✓ 4 Variant A — Strategy session selected');

// 5. Variant B homepage with coach marks visible
await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Variant B")');
await page.waitForTimeout(400);
writeFileSync('/tmp/final-05-varB-home-annotations.png', await page.screenshot());
console.log('✓ 5 Variant B — homepage with annotation badges visible');

// 6. Variant B — hover annotation 2 (event tiles)
await page.hover('button[aria-label="Annotation 2: Event type tiles as entry points"]');
await page.waitForTimeout(300);
writeFileSync('/tmp/final-06-varB-coachmark2.png', await page.screenshot());
console.log('✓ 6 Variant B — annotation 2 tooltip');

// 7. Variant B — hide annotations
await page.dispatchEvent('body', 'mouseleave');
await page.click('button:has-text("Hide annotations")');
await page.waitForTimeout(300);
writeFileSync('/tmp/final-07-varB-no-annotations.png', await page.screenshot());
console.log('✓ 7 Variant B — annotations hidden (clean view)');

await browser.close();
console.log('\nAll done.');
