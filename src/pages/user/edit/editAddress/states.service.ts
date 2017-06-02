import { Injectable } from '@angular/core';

@Injectable()
export class StatesService {
  states = [];

  constructor(){
    this.states = [
      {name:'Acre', initials:'ac'},
      {name:'Alagoas', initials:'al'},
      {name:'Amapá', initials:'ap'},

      {name:'Amazonas', initials:'am'},
      {name:'Bahia', initials:'ba'},
      {name:'Ceará', initials:'ce'},

      {name:'Distrito Federal', initials:'df'},
      {name:'Espírito Santo', initials:'es'},
      {name:'Goiás', initials:'go'},

      {name:'Maranhão', initials:'ma'},
      {name:'Mato Grosso', initials:'mt'},
      {name:'Mato Grosso do Sul', initials:'ms'},

      {name:'Minas Gerais', initials:'mg'},
      {name:'Pará', initials:'pa'},
      {name:'Paraíba', initials:'pb'},

      {name:'Paraná', initials:'pr'},
      {name:'Pernambuco', initials:'pe'},
      {name:'Piauí', initials:'pi'},

      {name:'Rio de Janeiro', initials:'rj'},
      {name:'Rio Grande do Norte', initials:'rn'},
      {name:'Rio Grande do Sul', initials:'rs'},

      {name:'Rondônia', initials:'ro'},
      {name:'Roraima', initials:'rr'},
      {name:'Santa Catarina', initials:'sc'},

      {name:'São Paulo', initials:'sp'},
      {name:'Sergipe', initials:'se'},
      {name:'Tocantis', initials:'to'},
    ]
  }
  
  getStates(){
    return this.states;
  }

}
