import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusForm } from 'app/enum/StatusForm';
import { Store } from 'app/interfaces/Store';
import { StoreService } from 'app/service/store/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  id=0;
  itemSelected: Store;
  options: string[] = ['subsidiary', 'address', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource!: any;
  sortedData : Store[];
  


  statusForm: StatusForm = StatusForm.SAVE;
  myForm: FormGroup;
  listStores: Array<Store>  = [];

  constructor(private storeService: StoreService) { }

  createTable() {
    this.dataSource = new MatTableDataSource(this.listStores);
    this.dataSource.sort = this.sort;
  }

  get subsidiary(){
    return this.myForm.get('subsidiary');
  }

  get address(){
    return this.myForm.get('address');
  }

  asignForm(item: Store){
    this.myForm.setValue(item);
  }

  clearForm(){
    this.myForm.reset();
  } 

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  editItem(item:Store){
    this.id = item.id
    this.itemSelected = item;
    delete item.id;
    this.statusForm = StatusForm.UPDATE;
    this.asignForm(item);
  }


  ngOnInit() {
    this.createTable();
    this.myForm = new FormGroup({
      subsidiary: new FormControl('',[ 
        Validators.required,
        Validators.minLength(4),
      ]),
      address: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ])
    });
    this.getAllStores();
    
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.createTable();
      this.getAllStores();
    });
    
    
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {

      let myObserver = {
        next:(value: Store)=>{
          this.getAllStores();
          this.clearForm();
        }
      };

      if (this.statusForm === StatusForm.SAVE) {
        this.storeService.saveStore({
          subsidiary: this.subsidiary.value,
          address: this.address.value,
        }).subscribe(myObserver);;
      }
      else if (this.statusForm === StatusForm.UPDATE) {
        this.storeService.updateStore({
          id:this.id,
          subsidiary: this.subsidiary.value,
          address: this.address.value,
        }).subscribe(myObserver);;
      }
    }
  }

  getAllStores(){
    let myObserver = {
      next:(value: Array<Store>)=>{
        this.listStores = value;
        this.createTable();
      }
    };


    this.storeService
    .getAllStores()
    .subscribe( myObserver );
  }


  sortData(sort: Sort) {
    const data = this.listStores.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'subsidiary':
          return this.compare(a.subsidiary, b.subsidiary, isAsc);
        case 'lastName':
          return this.compare(a.address, b.address, isAsc);
        default:
          return 0;
      }
    });
  }

}
