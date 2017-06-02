import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditAddress } from '../../user/edit/editAddress/edit-address.component';

@Component({
  selector: 'edit-enterprise',
  templateUrl: 'edit-enterprise.component.html'
})

export class EditEnterprise {
  editAddress: EditAddress;
  editEnterpriseForm: FormGroup;

  //Form used to edit an existing enterprise
  constructor(private formBuilder: FormBuilder) {
    this.editEnterpriseForm = formBuilder.group({
      'name': [null, Validators.required],
      'cnpj': [null, Validators.required],
      'occupationArea': [null, Validators.required],
      'address': formBuilder.array([this.initAddress()])
    });
  }

  //Method that connect component address to the main form
  initAddress(){
    return this.formBuilder.group({
      'cep' : [null, Validators.compose([Validators.required])],
      'city' : [null, Validators.compose([Validators.required])],
      'state' : [null, Validators.compose([Validators.required])],
      'neighbourhood' : [null, Validators.compose([Validators.required])],
      'number' : [null, Validators.compose([Validators.required])],
      'complement' : [null, Validators.compose([Validators.required])]
    });
  }
}
