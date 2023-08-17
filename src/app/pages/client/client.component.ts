import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/service/client/client.service';
import { StatusForm } from "app/enum/StatusForm";
import { Client } from "app/interfaces/Client";
import { min } from 'moment';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  id:0;
  options: string[] = ['name', 'lastName', 'address'];


  statusForm: StatusForm = StatusForm.SAVE;

  myForm: FormGroup;

  listClients: Array<Client>  = [];

  constructor(private clientService: ClientService) { }

  get address(){
    return this.myForm.get('address');
  }

  get lastName(){
    return this.myForm.get('lastName');
  }

  get name(){
    return this.myForm.get('name');
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('',[ 
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ]),
      address: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ])
    });
    this.getAllClients();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {

      if (this.statusForm === StatusForm.SAVE) {
        this.clientService.saveClient({
          address: this.address.value,
          lastName: this.lastName.value,
          name: this.name.value
        });
      }
      else if (this.statusForm === StatusForm.UPDATE) {
        this.clientService.updateClient({
          id:this.id,
          address: this.address.value,
          lastName: this.lastName.value,
          name: this.name.value
        });
      }
    }
  }

  getAllClients(){
    this.clientService
    .getAllClients()
    .subscribe( {
      next(value: Array<Client>){
        this.listClients = value;
      }
    });
  }

}
