var Browser = require("zombie");
var url = "http://localhost:3000";
var browser = new Browser({
    waitDuration: 29*1000
});

describe("Sign In Tests", function(){
  describe("Shouldn't show submit button if email is invalid", function () {
    it("Shouldn't allow signin with invalid information", function () {
      browser.visit(url, function(){
        browser.fill("#email input[name='email']", "test")
               .fill("#password input[name='password']", "Teste123");
      var submit = byId('sign-in-button');
      expect(submit.isEnabled()).toBe(false);
      });
    });
  });

  describe("Sign In Failure state", function () {
    it("Shouldn't allow signin with invalid information", function () {
      browser.visit(url, function(){
        browser.fill("#email input[name='email']", "test@gmail.com")
               .fill("#password input[name='password']", "Teste123")
               .pressButton("#sign-in-button button[type=submit]");
      expect(browser.html('body')).toContain("Login Error!");
      });
    });
  });
});
