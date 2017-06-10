import { browser, element, by } from 'protractor';
import { fillSignUpFields, fillLoginFields, clickSubmitLoginButton, clickSubmitSignUpButton, deleteUser } from '../../../functionsTests/user-functions-tests';
import { fillRegisterEnterpriseFields, clickRegisterButton, deleteEnterprise } from '../../../functionsTests/enterprise-functions-tests';

var user = {firstName: 'Test',
            lastName: 'Enterprise',
            email: 'test@test.com',
            password: 'Test1234'
           };

let enterprise;

let registerEnterpriseButton = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/ion-buttons/button'));

fdescribe('Create Enterprise Tests', () => {
  beforeEach(() => {
    // enterprise data used for the tests
    enterprise = {name: 'testEnterprise',
                      occupation: 'test',
                      cnpj: '64.574.402/0001-82',
                      address: {
                        cep: 12345678,
                        city: 'Brasilia',
                        neighbourhood: 'Gama',
                        number: 10,
                        complement: '32'
                        }
                     };

    // go to inicial page
    browser.get('');
    // wait for page load
    browser.driver.sleep(500);

    // go to sign-up page
    element(by.css('a')).click();
    // wait for page load
    browser.driver.sleep(500);

    fillSignUpFields(user);
    clickSubmitSignUpButton();
    // get text of title element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('Organizaê');

    fillLoginFields(user);
    clickSubmitLoginButton();
    // get text of title element
    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('User Homepage');

    // go to register enterprise page
    var buttonEnterprise = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/user-home/ion-content/div[2]/button[2]'));
    buttonEnterprise.click();
    browser.driver.sleep(500);

    expect(element(by.css('title')).getAttribute('innerHTML'))
          .toContain('Register Enterprise');
  });

  // delete the user created to the test
  afterEach(() => {
    deleteUser(user);
    deleteEnterprise(enterprise);
  });

  it('Should register an Enterprise', () => {
    fillRegisterEnterpriseFields(enterprise);
    clickRegisterButton();

    var titlePage = element(by.css('title'));
    expect(titlePage.getAttribute('innerHTML')).toContain('User Homepage');
  });

  it('Enterprise Name is empty', () => {
    enterprise.name = '';
    fillRegisterEnterpriseFields(enterprise);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/div[1]'));
    expect(errorMessage.getAttribute('innerHTML')).toContain('Name is required!');
    expect(registerEnterpriseButton.isEnabled()).toBeFalsy();
  });

  it('Occupation Area is empty', () => {
    enterprise.occupation = '';
    fillRegisterEnterpriseFields(enterprise);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/div'));
    expect(errorMessage.getAttribute('innerHTML')).toContain('Occupation area is required!');
    expect(registerEnterpriseButton.isEnabled()).toBeFalsy();
  });

  it('Cnpj is empty', () => {
    enterprise.cnpj = '';
    fillRegisterEnterpriseFields(enterprise);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/div[1]'));
    expect(errorMessage.getAttribute('innerHTML')).toContain('Cnpj is required!');
    expect(registerEnterpriseButton.isEnabled()).toBeFalsy();
  });

  it('Cnpj is invalid', () => {
    enterprise.cnpj = '11111111111111';
    fillRegisterEnterpriseFields(enterprise);

    var errorMessage = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/form/div[1]'));
    expect(errorMessage.getAttribute('innerHTML')).toContain('This cnpj number is not valid.');
    expect(registerEnterpriseButton.isEnabled()).toBeFalsy();
  });
});
