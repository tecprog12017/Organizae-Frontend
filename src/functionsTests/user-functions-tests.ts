import { browser, element, by } from 'protractor';

var chai = require('chai');
var chaiHttp  = require('chai-http');
var server = 'http://localhost:3000';

export let buttonSubmitSignup = element(by.xpath('//*[@id="sign-up-submit-button"]'));
export let buttonSubmitLogin = element(by.xpath('//*[@id="sign-in-button"]'));

export function fillSignUpFields(user){
  // get and fill signup fields
  var firstNameField = element(by.xpath('//*[@id="first-name"]/input'));
  firstNameField.sendKeys(user.firstName);

  var lastNameField = element(by.xpath('//*[@id="last-name"]/input'));
  lastNameField.sendKeys(user.lastName);

  var emailField = element(by.xpath('//*[@id="email-register"]/input'));
  emailField.sendKeys(user.email);

  var passwordField = element(by.xpath('//*[@id="password-register"]/input'));
  passwordField.sendKeys(user.password);

  var repeatPasswordField = element(by.xpath('//*[@id="repeat-password-register"]/input'));
  repeatPasswordField.sendKeys(user.password);
}

export function clickSubmitSignUpButton() {
  browser.driver.sleep(500);
  // click on button
  buttonSubmitSignup.click();

  // wait for redirect page
  browser.driver.sleep(500);
}

export function fillLoginFields(user) {
  var emailField = element(by.xpath('//*[@id="email"]/input[1]'));
  emailField.sendKeys(user.email);

  var passwordField = element(by.xpath('//*[@id="password"]/input[1]'));
  passwordField.sendKeys(user.password);
}

export function clickSubmitLoginButton() {
  browser.driver.sleep(500);
  // click on button
  buttonSubmitLogin.click();

  // wait for redirect page
  browser.driver.sleep(500);
}

export function deleteUser(user) {
  chai.use(chaiHttp);
  chai.request(server)
  .post('/api/UserProfiles/delete-user')
  .send(user)
  .end((err, res) => {
  });
}
