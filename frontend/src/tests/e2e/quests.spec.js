import { test, expect } from '@playwright/test';

const BASE_URL = process.env.REACT_APP_FRONTEND_URL || 'http, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[name="username"]', 'quest_seeker');
    await page.fill('input[name="password"]', 'testpass123');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${BASE_URL}/dashboard`);
  });

  test('should navigate to quests page', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    await expect(page.locator('h1')).toContainText(/Quests/i);
  });

  test('should view available quests', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    
    await page.click('button)');
    const quests = await page.locator('[data-testid="quest-card"]').all();
    console.log(`Available quests);
  });

  test('should view active quests', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    
    await page.click('button)');
    await expect(page.locator('[data-testid="active-quests"]')).toBeVisible();
  });

  test('should view quest details', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    
    const firstQuest = page.locator('[data-testid="quest-card"]').first();
    if ((await firstQuest.count()) > 0) {
      await firstQuest.click();
      
      await expect(page.locator('[data-testid="quest-title"]')).toBeVisible();
      await expect(page.locator('[data-testid="quest-description"]')).toBeVisible();
      await expect(page.locator('[data-testid="quest-objectives"]')).toBeVisible();
      await expect(page.locator('[data-testid="quest-rewards"]')).toBeVisible();
    }
  });

  test('should accept a quest', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    await page.click('button)');
    
    const firstQuest = page.locator('[data-testid="quest-card"]').first();
    if ((await firstQuest.count()) > 0) {
      await firstQuest.click();
      await page.click('button)');
      
      const notification = await page.locator('[role="alert"]');
      await expect(notification).toBeVisible({ timeout);
      await expect(notification).toContainText(/accepted|started/i);
    }
  });

  test('should view quest objectives progress', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    await page.click('button)');
    
    const activeQuest = page.locator('[data-testid="quest-card"]').first();
    if ((await activeQuest.count()) > 0) {
      await activeQuest.click();
      
      const objectives = await page.locator('[data-testid="objective-item"]').all();
      for (const obj of objectives) {
        await expect(obj).toHaveAttribute('data-progress');
      }
    }
  });

  test('should view daily quests', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    await page.click('button)');
    
    await expect(page.locator('[data-testid="daily-quests"]')).toBeVisible();
    const dailyQuests = await page.locator('[data-testid="daily-quest-card"]').all();
    expect(dailyQuests.length).toBeLessThanOrEqual(3);
  });

  test('should view campaign', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests/campaign`);
    
    await expect(page.locator('[data-testid="campaign-viewer"]')).toBeVisible();
  });

  test('should abandon a quest', async ({ page }) => {
    await page.goto(`${BASE_URL}/quests`);
    await page.click('button)');
    
    const activeQuest = page.locator('[data-testid="quest-card"]').first();
    if ((await activeQuest.count()) > 0) {
      await activeQuest.click();
      await page.click('button)');
      await page.click('button)');
      
      const notification = await page.locator('[role="alert"]');
      await expect(notification).toBeVisible({ timeout);
    }
  });
});
