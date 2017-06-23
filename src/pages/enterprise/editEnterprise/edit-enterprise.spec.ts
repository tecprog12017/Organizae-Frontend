import { browser, element, by } from 'protractor';
import { fillSignUpFields, fillLoginFields, clickSubmitLoginButton, clickSubmitSignUpButton, deleteUser } from '../../../functionsTests/user-functions-tests';
import { fillEditEnterpriseFields, clickEditEnterpriseSubmitButton, fillRegisterEnterpriseFields, clickRegisterButton, deleteEnterprise } from '../../../functionsTests/enterprise-functions-tests';

var user = {firstName: 'Test',
            lastName: 'Enterprise',
            email: 'test@test.com',
            password: 'Test1234'
           };

let enterprise;
let enterpriseEdit;

let editEnterpriseSubmitButton = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/edit-enterprise/ion-content/div[2]/form/ion-buttons/button'));
let editEnterpriseButton = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/ng-component/ion-content/div[2]/ion-card/ion-card-content/ion-item[4]/div[1]/button'));

fdescribe('Edit Enterprise Tests', () => {
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
    enterpriseEdit = enterprise;
    enterpriseEdit.userPassword = user.password;

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

    // register an enterprise
    fillRegisterEnterpriseFields(enterprise);
    clickRegisterButton();

    expect(element(by.css('title')).getAttribute('innerHTML')).toContain('User Homepage');

    // go to edit Enterprise page
    var buttonMyEnterprises = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/user-home/ion-content/div[2]/ion-grid/ion-row/ion-col[2]/button[1]'));
    buttonMyEnterprises.click();
    browser.driver.sleep(500);

    editEnterpriseButton.click();
    browser.driver.sleep(500);
  });

  // delete the user and enterprise created to the test
  afterEach(() => {
    deleteUser(user);
    deleteEnterprise(enterprise);
  });

  it('Should edit name enterprise', () => {
    enterpriseEdit.name = 'Other name';
    fillEditEnterpriseFields(enterpriseEdit);
    clickEditEnterpriseSubmitButton();

    editEnterpriseButton.click();
    browser.driver.sleep(500);
    expectFieldChange();
  });

  it('Should edit Occupation Area', () => {
    enterpriseEdit.occupation = 'Other occupation';
    fillEditEnterpriseFields(enterpriseEdit);
    clickEditEnterpriseSubmitButton();

    editEnterpriseButton.click();
    browser.driver.sleep(500);
    expectFieldChange();
  });

  it('Should edit cnpj', () => {
    enterpriseEdit.cnpj = '42.492.927/0001-36';
    fillEditEnterpriseFields(enterpriseEdit);
    clickEditEnterpriseSubmitButton();

    editEnterpriseButton.click();
    browser.driver.sleep(500);
    expectFieldChange();
  });
});

function expectFieldChange() {
  var nameEnterpriseField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/edit-enterprise/ion-content/div[2]/form/ion-item[1]/div[1]/div/ion-input/input[1]'));
  expect(nameEnterpriseField.getAttribute('value')).toContain(enterpriseEdit.name);

  var occupationField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/edit-enterprise/ion-content/div[2]/form/ion-item[2]/div[1]/div/ion-input/input[1]'));
  expect(occupationField.getAttribute('value')).toContain(enterpriseEdit.occupation);

  var cnpjField = element(by.xpath('/html/body/ion-app/ng-component/ion-nav/edit-enterprise/ion-content/div[2]/form/ion-item[3]/div[1]/div/ion-input/input[1]'));
  expect(cnpjField.getAttribute('value')).toContain(enterpriseEdit.cnpj);
}
