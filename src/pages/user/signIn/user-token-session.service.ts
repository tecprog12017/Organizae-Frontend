import { Injectable } from '@angular/core';

@Injectable()
export class UserTokenSession {
  userToken: any;

  constructor () {
  }

  setToken (userToken: Object) {
    this.userToken = userToken;
  }

  getToken () {
    return this.userToken;
  }

}
