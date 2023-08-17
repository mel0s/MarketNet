import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'app/service/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  address:'';
  name:'';
  lastName:'';

  myForm: FormGroup;

  constructor(clientService: ClientService ) { 

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      lasName: new FormControl(''),
      address: new FormControl('')
    });
  }

  onSubmit(form:FormGroup){
    if(form.valid){


    }

  }

}
