const { test, expect } = require("@playwright/test");
const { email, password } = require("./user");

test("test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL(/.*profile*/);
  const title = page.locator("h2");
  await expect(title).toHaveText("Мои курсы и профессии");
});
test("incorrect email field format", async ({ page }) => {
  const invalidEmail = "vasya";
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(invalidEmail);
  await page.getByPlaceholder("Пароль").focus();
  const warningMess = page.getByText("Неверный email");
  await expect(warningMess).toBeVisible();
});
test("authorization with invalid email", async ({ page }) => {
  const invalidEmail = "qwerty@mail.com";
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(invalidEmail);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  const errorMessage = page.getByTestId("login-error-hint");
  await expect(errorMessage).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
});
test("authorization with invalid password", async ({ page }) => {
  const invalidPass = "password";
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(invalidPass);
  await page.getByTestId("login-submit-btn").click();
  const errorMessage = page.getByTestId("login-error-hint");
  await expect(errorMessage).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
});
test("empty email field", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  const warningMess = page.getByText("Обязательное поле");
  await expect(warningMess).toBeVisible();
});
test("empty password field", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByTestId("login-submit-btn").click();
  const warningMess = page.getByText("Обязательное поле");
  await expect(warningMess).toBeVisible();
});

test("empty password field3", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByTestId("login-submit-btn").click();
  const warningMess1 = page.getByText("Обязательное поле").first();
  const warningMess2 = page.getByText("Обязательное поле").nth(1);
  await expect(warningMess1).toBeVisible();
  await expect(warningMess2).toBeVisible();
});
