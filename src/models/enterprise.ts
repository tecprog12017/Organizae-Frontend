import { FormGroup } from '@angular/forms';
import { UserProfile, Address } from './user-profile';

export class Enterprise {
  name: string;
  cnpj: string;
  occupationArea: string;
  address: Address;
  owner: UserProfile;

  constructor (form: FormGroup) {
    this.name = form.get('name').value;
    this.cnpj = form.get('cnpj').value;
    this.occupationArea = form.get('occupationArea').value;
    this.address = new Address(form);
    this.owner = null;
  }
}
