import { FormGroup } from '@angular/forms';

export class UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor( signUpForm: FormGroup) {
    this.firstName = signUpForm.get('firstName').value;
    this.lastName = signUpForm.get('lastName').value;
    this.email = signUpForm.get('email').value;
    this.password = signUpForm.get('password').value;
  }
}

export class Gender {
  genderIdentity: string;
  pronoun: string;

  constructor( editGenderForm: FormGroup) {
    console.log(editGenderForm.get('genderIdentity'));
    this.genderIdentity = editGenderForm.get('genderIdentity').value;
    this.pronoun = editGenderForm.get('pronoun').value;
  }
}
