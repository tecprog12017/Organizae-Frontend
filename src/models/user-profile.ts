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

export class Rg {
  rgNumber: string;
  rgExpeditionState: string;

  constructor( editForm: FormGroup) {
    this.rgNumber = editForm.get('documents').value[0].rgNumber;
    this.rgExpeditionState = editForm.get('documents').value[0].rgExpeditionState;
  }
}

export class Cpf {
  cpf: string;

  constructor( editForm: FormGroup) {
    this.cpf = editForm.get('documents').value[1].cpf;
  }
}

export class Address {
  cep: number
  city: string
  state: string
  neighbourhood: string
  number: number
  complement: string

  constructor( editForm: FormGroup) {
    this.cep = editForm.get('address').value[0].cep;
    this.city = editForm.get('address').value[0].city;
    this.state = editForm.get('address').value[0].state;
    this.neighbourhood = editForm.get('address').value[0].neighbourhood;
    this.number = editForm.get('address').value[0].number;
    this.complement = editForm.get('address').value[0].complement;
  }
}

export class Information {
  birthdate: Date;
  phone: string;

  constructor( editAdditionalInformation: FormGroup) {
    this.birthdate = editAdditionalInformation.get('personalInformation').value[0].birthdate;
    this.phone = editAdditionalInformation.get('personalInformation').value[0].phone;
  }
}

export class Gender {
  genderIdentity: string;
  pronoun: string;

  constructor( editGender: FormGroup) {
    this.genderIdentity = editGender.get('personalInformation').value[1].genderIdentity;
    this.pronoun = editGender.get('personalInformation').value[1].pronoun;
  }
}
