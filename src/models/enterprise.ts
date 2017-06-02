import { FormGroup } from '@angular/forms';
import { Address } from './user-profile';

export class Enterprise {
  name: string;
  cnpj: string;
  oldCnpj: string;
  occupationArea: string;
  address: Address;
  owner: Object;
  confirmationPassword: string;

  constructor (form: FormGroup) {
    this.name = form.get('name').value;
    this.cnpj = form.get('cnpj').value;
    this.occupationArea = form.get('occupationArea').value;
    this.address = new Address(form);
    this.owner = null;
  }

  public setEditEnterprise(form: FormGroup) {
    this.name = form.get('name').value;
    this.cnpj = form.get('cnpj').value;
    this.occupationArea = form.get('occupationArea').value;
    this.confirmationPassword = form.get('confirmationPassword').value;
    this.address = new Address(form);
    this.owner = null;
  }

}
