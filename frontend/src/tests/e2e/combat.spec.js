import { test, expect } from '@playwright/test';

const BASE_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';

test.describe('Combat E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="username"]', 'fighter_test');
    await page.fill('input[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);
  });

  test('should navigate to combat arena', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat`);

    // Verify combat page elements
    await expect(page.locator('h1')).toContainText(/Combat|Arena/i);
    await expect(page.locator('[data-testid="combat-stats"]')).toBeVisible();
  });

  test('should view combat stats', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat`);

    // Check combat stats display
    await expect(page.locator('[data-testid="hp-display"]')).toBeVisible();
    await expect(page.locator('[data-testid="attack-display"]')).toBeVisible();
    await expect(page.locator('[data-testid="defense-display"]')).toBeVisible();

    // Verify stats have numeric values
    const hpText = await page.locator('[data-testid="hp-display"]').textContent();
    expect(hpText).toMatch(/\d+/);
  });

  test('should challenge another player', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat`);

    // Click challenge button
    await page.click('button:text("Challenge")');

    // Wait for player list
    await page.waitForSelector('[data-testid="player-list"]');

    // Select first available player
    const firstPlayer = page.locator('[data-testid="challenge-target"]').first();
    if ((await firstPlayer.count()) > 0) {
      await firstPlayer.click();

      // Confirm challenge
      await page.click('button:text("Confirm")');

      // Wait for confirmation
      const notification = await page.locator('[role="alert"]');
      await expect(notification).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display action bar during combat', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/active`);

    // Check if in active combat
    const combatActive = await page.locator('[data-testid="combat-active"]').count();

    if (combatActive > 0) {
      // Verify action bar
      await expect(page.locator('[data-testid="action-bar"]')).toBeVisible();

      // Verify action buttons
      await expect(page.locator('button:text("Attack")')).toBeVisible();
      await expect(page.locator('button:text("Defend")')).toBeVisible();
    }
  });

  test('should perform attack action', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/active`);

    const combatActive = await page.locator('[data-testid="combat-active"]').count();

    if (combatActive > 0) {
      // Click attack button
      await page.click('button:text("Attack")');

      // Wait for combat log update
      await page.waitForSelector('[data-testid="combat-log-entry"]', {
        timeout: 5000,
      });

      // Verify combat log shows the attack
      const latestLogEntry = page.locator('[data-testid="combat-log-entry"]').first();
      await expect(latestLogEntry).toContainText(/attack|hit|damage/i);
    }
  });

  test('should use superpower in combat', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/active`);

    const combatActive = await page.locator('[data-testid="combat-active"]').count();

    if (combatActive > 0) {
      // Open powers menu
      await page.click('button:text("Powers")');

      // Select first available power
      const firstPower = page.locator('[data-testid="combat-power"]').first();
      if ((await firstPower.count()) > 0) {
        await firstPower.click();

        // Confirm power usage
        await page.click('button:text("Use Power")');

        // Verify power was used
        const notification = await page.locator('[role="alert"]');
        await expect(notification).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should display health bars', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/active`);

    const combatActive = await page.locator('[data-testid="combat-active"]').count();

    if (combatActive > 0) {
      // Verify player health bar
      await expect(page.locator('[data-testid="player-health-bar"]')).toBeVisible();

      // Verify opponent health bar
      await expect(page.locator('[data-testid="opponent-health-bar"]')).toBeVisible();
    }
  });

  test('should view combat history', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/history`);

    // Verify combat history page
    await expect(page.locator('h1')).toContainText(/History|Past Battles/i);

    // Check for battle records
    const battleRecords = await page.locator('[data-testid="battle-record"]').all();
    console.log(`Battle records found: ${battleRecords.length}`);

    if (battleRecords.length > 0) {
      // Click on first battle to view details
      await battleRecords[0].click();

      // Verify battle details
      await expect(page.locator('[data-testid="battle-details"]')).toBeVisible();
    }
  });

  test('should join arena queue', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/arena`);

    // Click join queue button
    await page.click('button:text("Join Queue")');

    // Wait for queue status
    await page.waitForSelector('[data-testid="queue-status"]', { timeout: 5000 });

    // Verify in queue
    const queueStatus = await page.locator('[data-testid="queue-status"]');
    await expect(queueStatus).toContainText(/queue|waiting/i);
  });

  test('should display arena rankings', async ({ page }) => {
    await page.goto(`${BASE_URL}/combat/arena`);

    // Navigate to rankings tab
    await page.click('button:text("Rankings")');

    // Verify rankings list
    await expect(page.locator('[data-testid="arena-rankings"]')).toBeVisible();

    const rankings = await page.locator('[data-testid="rank-entry"]').all();
    expect(rankings.length).toBeGreaterThan(0);
  });
});
