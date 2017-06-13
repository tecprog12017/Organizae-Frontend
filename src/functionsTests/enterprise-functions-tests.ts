import { browser, element, by } from 'protractor';

var chai = require('chai');
var chaiHttp  = require('chai-http');
var server = 'http://localhost:3000';

export function fillRegisterEnterpriseFields(enterprise) {
  var nameEnterpriseField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/ion-item[1]/div[1]/div/ion-input/input'));
  nameEnterpriseField.sendKeys(enterprise.name);

  var occupationField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/ion-item[2]/div[1]/div/ion-input/input'));
  occupationField.sendKeys(enterprise.occupation);

  var cnpjField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/ion-item[3]/div[1]/div/ion-input/input'));
  cnpjField.sendKeys(enterprise.cnpj);

  fillAddressFields(enterprise.address);
}

function fillAddressFields(address) {
  var cepField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/edit-address/ion-list[1]/ion-item/div[1]/div/ion-input/input'));
  cepField.sendKeys(address.cep);

  var cityField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/edit-address/ion-list[2]/ion-item/div[1]/div/ion-input/input'));
  cityField.sendKeys(address.city);

  var stateField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/edit-address/ion-list[3]/ion-item/div[1]/div/ion-select'));
  stateField.click();
  browser.driver.sleep(500);
  // select Acre state
  element(by.xpath('//*[@id="alert-input-0-0"]')).click();
  // click on ok button
  element(by.xpath('/html/body/ion-app/ion-alert/div/div[4]/button[2]')).click();

  var neighbourhoodField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/edit-address/ion-list[4]/ion-item/div[1]/div/ion-input/input'));
  neighbourhoodField.sendKeys(address.neighbourhood);

  var numberField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/edit-address/ion-list[5]/ion-item/div[1]/div/ion-input/input'));
  numberField.sendKeys(address.number);

  var complementField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/edit-address/ion-list[6]/ion-item/div[1]/div/ion-input/input'));
  complementField.sendKeys(address.complement);
}

export function clickRegisterButton() {
  browser.driver.sleep(500);
  let registerEnterpriseButton = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/ion-buttons/button'));

  registerEnterpriseButton.click();

  // wait for redirect page
  browser.driver.sleep(500);
}

export function deleteEnterprise(enterprise) {
  chai.request(server)
      .post('/api/enterprises/delete-enterprise')
      .send(enterprise)
      .end((err, res) => {
      });
}
