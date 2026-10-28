import { test, expect } from '@playwright/test';

test('Forsiden kan åbnes', async ({ page }) => {
  await page.goto('https://www.zealand.dk/');                         // 1. åbne zealand.dk
  const logo = page.getByRole('link', { name: 'Logo' });              // 2. finde relevante elementer på siden + 3. bruge locators (getByRole)
  await expect(logo).toBeVisible();                                   // 4. bruge expect() til at kontrollere resultatet
});

test('Cookies kan afvises', async ({ page }) => {
  await page.goto('https://www.zealand.dk/');
  await page.getByRole('button', { name: 'Afvis' }).click();
  await expect(page.getByRole('button', { name: 'Afvis' })).toBeHidden(); // Checker cookies
});

test('Kan skifte til engelsk og tilbage til dansk', async ({ page }) => {
  await page.goto('https://www.zealand.dk/');
  await page.getByRole('link', { name: 'Switch language to EN' }).click();
  await expect(page).toHaveURL('https://zealand.com/'); // checks the URL itself changed
  await page.getByRole('link', { name: 'DK', exact: true }).click();
  await expect(page).toHaveURL('https://www.zealand.dk/');
});

test('Overvågningspolitik peger på den rigtige PDF-fil', async ({ page }) => {
  await page.goto('https://www.zealand.dk/');
  await page.getByRole('button', { name: 'Afvis' }).click();

  const link = page.getByRole('link', { name: 'Gå til Overvågningspolitik' });
  await expect(link).toHaveAttribute('href', 'https://www.zealand.dk/docs/Overvaagningspolitik.pdf');
  await expect(link).toHaveAttribute('target', '_blank'); // confirms it's set up to open in a new tab
});

test('Adgangskrav-sektion kan åbnes og lukkes', async ({ page }) => {
  await page.goto('https://www.zealand.dk/efteruddannelse/diplom-i-ledelse/');
  const button = page.getByRole('button', { name: 'Adgangskrav' });
  await button.click();
  await expect(button).toHaveClass(/active/);
  await button.click();
  await expect(button).not.toHaveClass(/active/);
});