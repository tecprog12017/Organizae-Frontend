import { browser, element, by } from 'protractor';

var chai = require('chai');
var chaiHttp  = require('chai-http');
var server = 'http://localhost:3000';

var user = {firstName: 'Test',
            lastName: 'SignUp',
            email: 'test@test.com',
            password: 'Test1234'};

describe('Sign-up Tests', () => {
  beforeEach(() => {
    browser.get('');
    // wait for page load
    browser.driver.sleep(500);

    // go to sign-up page
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);
  });

  var firstNameField, lastNameField, emailField, passwordField, repeatPasswordField, buttonSubmit;
  // get all sign-up fields
  beforeEach(() => {
    firstNameField = element(by.xpath('//*[@id="first-name"]/input'));
    lastNameField = element(by.xpath('//*[@id="last-name"]/input'));
    emailField = element(by.xpath('//*[@id="email-register"]/input'));
    passwordField = element(by.xpath('//*[@id="password-register"]/input'));
    repeatPasswordField = element(by.xpath('//*[@id="repeat-password-register"]/input'));
    buttonSubmit = element(by.xpath('//*[@id="sign-up-submit-button"]'));
  });

  // delete the user created to the test
  afterEach(function(done) {
    chai.use(chaiHttp);
    chai.request(server)
    .post('/api/UserProfiles/delete-user')
    .send(user)
    .end((err, res) => {
      done();
    });
  });

  // all fields are filled correctly
  it('Should sign-up', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.email);
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    // wait button is enabled
    browser.driver.sleep(500);
    // click on button
    buttonSubmit.click();

    // wait for redirect page
    browser.driver.sleep(500);

    // get text of title element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('Organizaê');
  });

  // test empty first-name validation
  it('First name is empty', () => {
    // fill all sign-up fields
    firstNameField.sendKeys('');
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.email);
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('First name is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test empty last-name validation
  it('Last name is empty', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys('');
    emailField.sendKeys(user.email);
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Last name is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test empty email validation
  it('Email is empty', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys('');
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('E-mail is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test email validation
  it('Email is invalid', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys('wrongemail');
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Type a valid e-mail.');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test empty password validation
  it('Password is empty', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.password);
    passwordField.sendKeys('');
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[2]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Password is required!');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  // test password validation
  it('Password is invalid', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.email);
    passwordField.sendKeys('invalid');
    repeatPasswordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Your password must have at least one digit, one upper case letter and one lower case letter.');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  it('Repeat password dont match', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.email);
    repeatPasswordField.sendKeys('otherPassword');
    passwordField.sendKeys(user.password);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/sign-up/ion-content/div[2]/ion-card/form/div[1]'));

    expect(errorMessage.getAttribute('innerHTML')).toContain('Your passwords must match.');
    expect(buttonSubmit.isEnabled()).toBeFalsy();
  });

  it('User alredy registered', () => {
    // fill all sign-up fields
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.email);
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    // wait button is enabled
    browser.driver.sleep(500);
    // click on button
    buttonSubmit.click();

    // wait for redirect page
    browser.driver.sleep(500);

    // go to sign-up page again
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);

    // fill all sign-up fields again
    firstNameField.sendKeys(user.firstName);
    lastNameField.sendKeys(user.lastName);
    emailField.sendKeys(user.email);
    passwordField.sendKeys(user.password);
    repeatPasswordField.sendKeys(user.password);

    // wait button is enabled
    browser.driver.sleep(500);
    // click on button
    buttonSubmit.click();

    browser.driver.sleep(500);

    var errorMessage = element(by.xpath('//*[@class="alert-title"]'));
    expect(errorMessage.getAttribute('innerHTML')).toContain('Sign Up Error!');
  });
});
