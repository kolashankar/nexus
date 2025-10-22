import { test, expect } from '@playwright/test';
const BASE_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
test.describe('Marketplace E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[name="username"]', 'merchant_user');
        await page.fill('input[name="password"]', 'testpass123');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${BASE_URL}/dashboard`);
    });
    test('should navigate to marketplace', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await expect(page.locator('h1')).toContainText(/Marketplace/i);
    });
    test('should view robot listings', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Robots")');
        const robotCards = await page.locator('[data-testid="robot-card"]').all();
        expect(robotCards.length).toBeGreaterThan(0);
    });
    test('should filter robots by class', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Robots")');
        await page.click('[data-testid="filter-dropdown"]');
        await page.click('button:has-text("Combat")');
        await page.waitForSelector('[data-testid="robot-card"]');
        const cards = await page.locator('[data-testid="robot-card"]').all();
        for (const card of cards) {
            const classText = await card.getAttribute('data-class');
            expect(classText).toBe('combat');
        }
    });
    test('should view robot details', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Robots")');
        const firstRobot = page.locator('[data-testid="robot-card"]').first();
        await firstRobot.click();
        await expect(page.locator('[data-testid="robot-details"]')).toBeVisible();
        await expect(page.locator('[data-testid="robot-price"]')).toBeVisible();
        await expect(page.locator('[data-testid="robot-stats"]')).toBeVisible();
    });
    test('should purchase a robot', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Robots")');
        const firstRobot = page.locator('[data-testid="robot-card"]').first();
        await firstRobot.click();
        await page.click('button:has-text("Buy")');
        await page.click('button:has-text("Confirm Purchase")');
        const notification = await page.locator('[role="alert"]');
        await expect(notification).toBeVisible({ timeout: 5000 });
    });
    test('should view stock market', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Stocks")');
        await expect(page.locator('[data-testid="stock-list"]')).toBeVisible();
        const stocks = await page.locator('[data-testid="stock-item"]').all();
        expect(stocks.length).toBeGreaterThan(0);
    });
    test('should view stock chart', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Stocks")');
        const firstStock = page.locator('[data-testid="stock-item"]').first();
        await firstStock.click();
        await expect(page.locator('[data-testid="stock-chart"]')).toBeVisible();
    });
    test('should buy stocks', async ({ page }) => {
        await page.goto(`${BASE_URL}/marketplace`);
        await page.click('button:has-text("Stocks")');
        const firstStock = page.locator('[data-testid="stock-item"]').first();
        await firstStock.click();
        await page.click('button:has-text("Buy")');
        await page.fill('input[name="quantity"]', '10');
        await page.click('button:has-text("Confirm")');
        const notification = await page.locator('[role="alert"]');
        await expect(notification).toBeVisible({ timeout: 5000 });
    });
});
