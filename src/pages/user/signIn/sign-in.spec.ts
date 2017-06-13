import { browser, element, by } from 'protractor';
import { deleteUser, fillSignUpFields, fillLoginFields, clickSubmitLoginButton, clickSubmitSignUpButton } from '../../../functionsTests/user-functions-tests'

var user;

describe('Sign-in Tests', () => {
  // sign-up user
  beforeEach(() => {
    user = {firstName: 'Test',
            lastName: 'Login',
            email: 'test@test.com',
            password: 'Test1234'};

    browser.get('');
    // wait for page load
    browser.driver.sleep(500);

    // go to sign-up page
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);

    fillSignUpFields(user);
    clickSubmitSignUpButton();

    // get text of element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('Organizaê');
  });

  // Delete the user created to the test
  afterEach( () => {
    deleteUser(user);
  });

  // All fields are filled correctly
  it('should sign-in', () => {
    fillLoginFields(user);
    clickSubmitLoginButton();

    // get text of element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('User Homepage');
  });

  it('Email field is invalid', () => {
    // fill sign-in fields
    var emailField = element(by.xpath('//*[@id="email"]/input[1]'));
    emailField.sendKeys('test');

    var passwordField = element(by.xpath('//*[@id="password"]/input[1]'));
    passwordField.sendKeys(user.password);

    var buttonSubmitSignIn = element(by.xpath('//*[@id="sign-in-button"]'));
    expect(buttonSubmitSignIn.isEnabled()).toBeFalsy();
  });

  it('Password is not correct', () => {
    user.password = 'Test4567';
    fillLoginFields(user);
    clickSubmitLoginButton();

    // get text of element
    expect(element(by.css('#alert-hdr-0')).getAttribute('innerHTML'))
          .toContain('Login Error!');
  });
});
