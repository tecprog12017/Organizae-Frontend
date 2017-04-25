import { FormGroup } from '@angular/forms';
import { UserProfile } from './user-profile';

export class Enterprise {
  name: string;
  cnpj: string;
  occupationArea: string;
  address: string;
  owner: UserProfile;
}
