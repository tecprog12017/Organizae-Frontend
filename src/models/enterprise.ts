import { FormGroup } from '@angular/forms';
import { UserProfile } from './user-profile';

export class Enterprise {
  name: string;
  cnpj: string;
  occupationArea: string;
  address: string;
  owner: UserProfile;

  constructor (form: FormGroup) {
    this.name = form.get('name').value;
    this.cnpj = form.get('cnpj').value;
    this.occupationArea = form.get('occupationArea').value;
    this.owner = null;
  }
}
