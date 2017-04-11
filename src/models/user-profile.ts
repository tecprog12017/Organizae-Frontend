import { FormGroup } from '@angular/forms';

export class UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor (form: FormGroup) {
    this.firstName = form.get('firstName').value;
    this.lastName = form.get('lastName').value;
    this.email = form.get('email').value;
    this.password = form.get('password').value;
  }

}
