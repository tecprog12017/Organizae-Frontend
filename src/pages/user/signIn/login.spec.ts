import { browser, element, by } from 'protractor';

var chai = require('chai');
var chaiHttp  = require('chai-http');
var server = 'http://localhost:3000';

var user = {firstName: 'Test',
            lastName: 'Login',
            email: 'test@test.com',
            password: 'Test1234'};

describe('Sign-in Tests', () => {
  var emailFieldSignIn, passwordFieldSignIn, buttonSubmitSignIn;
  // sign-up user
  beforeEach(() => {
    browser.get('');
    // wait for page load
    browser.driver.sleep(500);

    // go to sign-up page
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);

    // get all sign-up fields
    var firstNameField = element(by.xpath('//*[@id="first-name"]/input'));
    var lastNameField = element(by.xpath('//*[@id="last-name"]/input'));
    var emailFieldSignUp = element(by.xpath('//*[@id="email-register"]/input'));
    var passwordFieldSignUp = element(by.xpath('//*[@id="password-register"]/input'));
    var repeatPasswordField = element(by.xpath('//*[@id="repeat-password-register"]/input'));

    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailFieldSignUp.sendKeys(user.email);
    passwordFieldSignUp.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    // wait button is enabled
    browser.driver.sleep(500);
    // click on button
    element(by.xpath('//*[@id="sign-up-submit-button"]')).click();

    // wait for redirect page
    browser.driver.sleep(500);
  });

  // get sign-in fields
  beforeEach(() => {
    emailFieldSignIn = element(by.xpath('//*[@id="email"]/input'));
    passwordFieldSignIn = element(by.xpath('//*[@id="password"]/input'));
    buttonSubmitSignIn = element(by.xpath('//*[@id="sign-in-button"]'));
  });

  // Delete the user created to the test
  afterEach(function(done) {
    chai.use(chaiHttp);
    chai.request(server)
    .post('/api/UserProfiles/delete-user')
    .send(user)
    .end((err, res) => {
      done();
    });
  });

  // All fields are filled correctly
  it('should sign-in', () => {
    // fill sign-in fields
    emailFieldSignIn.sendKeys('test@test.com');
    passwordFieldSignIn.sendKeys('Test1234');

    // wait button is enabled
    browser.driver.sleep(500);
    buttonSubmitSignIn.click();

    // wait for redirect page
    browser.driver.sleep(500);

    // get text of element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('User Homepage');
  });

  it('Email field is invalid', () => {
    // fill sign-in fields
    emailFieldSignIn.sendKeys('test');
    passwordFieldSignIn.sendKeys(user.password);

    browser.driver.sleep(500);
    expect(buttonSubmitSignIn.isEnabled()).toBeFalsy();
  });

  it('Password is not correct', () => {
    emailFieldSignIn.sendKeys(user.email);
    passwordFieldSignIn.sendKeys('Test4567');

    browser.driver.sleep(500);
    buttonSubmitSignIn.click();
    browser.driver.sleep(500);

    // get text of element
    expect(element(by.css('#alert-hdr-0')).getAttribute('innerHTML'))
          .toContain('Login Error!');
  });
});
