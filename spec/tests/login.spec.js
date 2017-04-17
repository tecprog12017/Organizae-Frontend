var Browser = require("zombie");
var url = "http://localhost:3000";
var browser = new Browser({
    waitDuration: 29*1000
});

describe("Sign In Tests", function(){
  describe("Sign In Failure state", function () {
    it("Shouldn't allow signin with invalid information", function () {
      browser.visit(url, function(){
        browser.fill("#email input[name='email']", "uhuu@gmail.com")
               .fill("#password input[name='password']", "Teste123")
               .pressButton("#sign-in-button button[type=submit]");
        expect(browser.html('body')).toContain("Login Error!");
      });
    });
  });
});
