import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async } from '@angular/core/testing';

import { SignIn } from 'sign-in.component.ts'

var Browser = require("zombie");
var url = "http://localhost:3000";
var browser = new Browser();

describe("Sign In Tests", function(){

  let signInComponent: SignIn;
  let fixture: ComponentFixture<SignIn>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ signInComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignIn);
    signInComponent = fixture.componentInstance;
  });

  it("Should sign in with success", function () {
    browser.visit(url, function(){
      browser.pressButton("#register-button button[type=submit]")
             .fill("#first-name input[name='first name']", "Little")
             .fill("#last-name input[name='last name']", "Test")
             .fill("#email-register input[name='email']", "teste@gmail.com")
             .fill("#password-register input[name='password']", "Teste123")
             .pressButton("#sign-up-submit-button button[type=submit]")
             .fill("#email input[name='email']", "teste@gmail.com")
             .fill("#password input[name='password']", "Teste123");
      expect(browser.html('body')).toNotContain("User Homepage");;
    });
  });

  it("Shouldn't allow signin with invalid email", function () {
    browser.visit(url, function(){
      browser.fill("#email input[name='email']", "test")
             .fill("#password input[name='password']", "Teste123");
      var submit = byId('sign-in-button');
      expect(submit.isEnabled()).toBe(false);
    });
  });

  it("Shouldn't allow signin with invalid password", function () {
    browser.visit(url, function(){
      browser.fill("#email input[name='email']", "test@test.com")
             .fill("#password input[name='password']", "test");
      var submit = byId('sign-in-button');
      expect(submit.isEnabled()).toBe(false);
    });
  });

  it("Shouldn't allow signin with invalid information", function () {
    browser.visit(url, function(){
      browser.fill("#email input[name='email']", "test@gmail.com")
             .fill("#password input[name='password']", "Teste123")
             .pressButton("#sign-in-button button[type=submit]");
      expect(browser.html('body')).toContain("Login Error!");
    });
  });
});
