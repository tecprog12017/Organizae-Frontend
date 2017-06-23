import { browser, element, by } from 'protractor';
import { fillSignUpFields, clickSubmitSignUpButton, deleteUser } from '../../../functionsTests/user-functions-tests'

var chai = require('chai');
var chaiHttp  = require('chai-http');
var server = 'http://localhost:3000';

var user;

describe('Sign-up Tests', () => {
  beforeEach(() => {
    user = {firstName: 'Test',
    lastName: 'SignUp',
    email: 'test@test.com',
    password: 'Test1234'};

    browser.get('');
    // wait for page load
    browser.driver.sleep(500);

    // go to sign-up page
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);
  });

  // delete the user created to the test
  afterEach(() => {
    deleteUser(user);
  });

  // all fields are filled correctly
  it('Should sign-up', () => {
    // fill all sign-up fields
    fillSignUpFields(user);
    clickSubmitSignUpButton();

    // wait for redirect page
    browser.driver.sleep(500);

    // get text of title element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('Organizaê');
  });

  // test empty first-name validation
  it('First name is empty', () => {
    // fill all sign-up fields
    user.firstName = '';
    fillSignUpFields(user);

    browser.driver.sleep(500);
    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('First name is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test empty last-name validation
  it('Last name is empty', () => {
    user.lastName = '';
    fillSignUpFields(user);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Last name is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test empty email validation
  it('Email is empty', () => {
    user.email = '';
    fillSignUpFields(user);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('E-mail is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test email validation
  it('Email is invalid', () => {
    user.email = 'invalidEmail';
    fillSignUpFields(user);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Type a valid e-mail.');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test empty password validation
  it('Password is empty', () => {
    user.password = '';
    fillSignUpFields(user);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Password is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test password validation
  it('Password is invalid', () => {
    user.password = 'invalid';
    fillSignUpFields(user);
    var repeatPasswordField = element(by.xpath('//*[@id="repeat-password-register"]/input'))
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Your password must have at least one digit, one upper case letter and one lower case letter.');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  it('Repeat password dont match', () => {
    fillSignUpFields(user);

    var repeatPasswordField = element(by.xpath('//*[@id="repeat-password-register"]/input'))
    repeatPasswordField.clear();
    repeatPasswordField.sendKeys('otherPassword');

    // must click in other place to show the error message in repeat password
    element(by.xpath('//*[@id="password-register"]/input')).click();

    browser.driver.sleep(500);
    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));
    var buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Your passwords must match.');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  it('User alredy registered', () => {
    fillSignUpFields(user);
    clickSubmitSignUpButton();

    // go to sign-up page again
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);

    fillSignUpFields(user);
    clickSubmitSignUpButton();

    var errorMessage = element(by.xpath('//*[@class="alert-title"]'));
    expect(errorMessage.getAttribute('innerHTML')).toContain('Sign Up Error!');
  });
});
