import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'app/service/client/client.service';
import { StatusForm } from "app/enum/StatusForm";
import { Client } from "app/interfaces/Client";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit , AfterViewInit {

  id=0;
  itemSelected: Client;
  options: string[] = ['name', 'lastName', 'address','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tabla', {static:true}) tabla: MatTable<any >;
  dataSource!: any;
  


  statusForm: StatusForm = StatusForm.SAVE;
  myForm: FormGroup;
  listClients: Array<Client>  = [];
  
  sortedData : Client[];

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

  asignForm(item: Client){
    this.myForm.setValue(item);
  }


  editItem(item:Client){
    this.id = item.id
    this.itemSelected = item;
    delete item.id;
    this.statusForm = StatusForm.UPDATE;
    this.asignForm(item);
  }

  sortData(sort: Sort) {
    const data = this.listClients.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'lastName':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'addres':
          return this.compare(a.address, b.address, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  createTable() {
    this.dataSource = new MatTableDataSource(this.listClients);
    this.dataSource.sort = 
    this.dataSource.sort = this.sort;
    this.tabla.dataSource = this.dataSource;
    
    this.tabla.renderRows();
  }


  clearForm(){
    this.myForm.reset();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.createTable();
      this.getAllClients();
    });
    
    
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
    
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {

      let myObserver = {
        next:(value: Client)=>{
          this.getAllClients();
          this.clearForm();
        }
      };

      if (this.statusForm === StatusForm.SAVE) {
        this.clientService.saveClient({
          address: this.address.value,
          lastName: this.lastName.value,
          name: this.name.value
        }).subscribe(myObserver);
      }
      else if (this.statusForm === StatusForm.UPDATE) {
        this.clientService.updateClient({
          id:this.id,
          address: this.address.value,
          lastName: this.lastName.value,
          name: this.name.value
        }).subscribe(myObserver);;
      }
    }
  }

  getAllClients(){

    let myObserver = {
      next:(value: Array<Client>)=>{
        this.listClients = value;
        this.createTable();
      }
    };


    this.clientService
    .getAllClients()
    .subscribe(myObserver);
  }

}
