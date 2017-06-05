import { Injectable } from '@angular/core';

@Injectable()
export class UserTokenSession {
  userToken: string;

  constructor () {
  }

  setToken (userToken: string) {
    this.userToken = userToken;
  }

  getToken () {
    return this.userToken;
  }

}
