import { browser, element, by } from 'protractor';

describe('Sign-in Tests', () => {
  var emailField, passwordField, buttonSubmit;

  // Executed before each 'it'
  beforeEach(() => {

    browser.get('');
    // wait for page load
    browser.driver.sleep(500);

    emailField = element(by.xpath('//*[@id="email"]/input'));
    passwordField = element(by.xpath('//*[@id="password"]/input'));
    buttonSubmit = element(by.xpath('//*[@id="sign-in-button"]'));
  });

  // All fields are filled correctly
  it('should sign-in', () => {
    // fill sign-in fields
    emailField.sendKeys('test@test.com');
    passwordField.sendKeys('Test1234');
    browser.driver.sleep(1500);

    expect(buttonSubmit.isEnabled()).toBeTruthy();
  });

  it('Email field is not correct', () => {
    // fill sign-in fields
    emailField.sendKeys('test');
    passwordField.sendKeys('Test1234');
    browser.driver.sleep(1500);

    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });
});
