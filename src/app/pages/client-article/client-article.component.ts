import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StatusForm } from '@app/enum/StatusForm';
import { Client } from '@app/interfaces/Client';
import { ClientArticle } from '@app/interfaces/ClientArticle';
import { List } from '@app/interfaces/List';
import { ClientArticleService } from '@app/service/client-article/client-article.service';
import { ClientService } from '@app/service/client/client.service';

@Component({
  selector: 'app-client-article',
  templateUrl: './client-article.component.html',
  styleUrls: ['./client-article.component.scss']
})
export class ClientArticleComponent implements OnInit, AfterViewInit {

  id=0;
  options: string[] = ['client', 'article', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tabla', {static:true}) tabla: MatTable<any >;
  dataSource!: any;


  statusForm: StatusForm = StatusForm.SAVE;
  myForm: FormGroup;
  listClientArticles: Array<ClientArticle>  = [];
  listClients : List[]= [{
    value:"Hola",
    id:1

  }];
  sortedData : ClientArticle[] =[];
  selectedItem: string;
  itemSelected! : ClientArticle ;

  constructor(private clientArticleService: ClientArticleService,private clientService :ClientService) { }

  get client(){
    return this.myForm.get('client');
  }

  get article(){
    return this.myForm.get('article');
  }

  

  asignForm(item: ClientArticle){
    this.myForm.setValue({
      client:  item.clientId,
      article:  item.articleId,
    });

  }

  clearForm(){
    this.myForm.reset();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.listClientArticles);
    this.dataSource.sort = this.sort;
  }

  editItem(item:ClientArticle){
    this.id = item.id
    this.itemSelected = item;
    delete item.id;
    this.statusForm = StatusForm.UPDATE;
    this.asignForm(item);
  }

  getAllArticles(){

    let myObserver = {
      next:(value: Array<ClientArticle>)=>{
        this.listClientArticles = value;
        this.createTable();
      }
    };
    this.clientArticleService
    .getAllClientArticles()
    .subscribe(myObserver);
  }

  getAllClients(){

    let myObserver = {
      next:(value: List[])=>{
        this.listClients = value;
        
      }
    };

    this.clientService
        .getListClient()
        .subscribe(myObserver);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createTable();
      this.getAllArticles();
      this.getAllClients()
      
    });
    
    
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      client: new FormControl('',[ 
        Validators.required,
      ]),
      article: new FormControl('',[
        Validators.required,
      ])      
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {

      let myObserver = {
        next:(value: ClientArticle)=>{
          this.getAllArticles();
          this.clearForm();
        }
      };

      if (this.statusForm === StatusForm.SAVE) {
        this.clientArticleService
        .saveClientArticles({
          clientId: Number(this.client.value),
          articleId: Number(this.article.value),
        })
        .subscribe(myObserver);
      }
      else if (this.statusForm === StatusForm.UPDATE) {
        this.clientArticleService.updateClientArticles({
          id:this.id,
          clientId: Number(this.client.value),
          articleId: Number(this.article.value),
        })
        .subscribe(myObserver);
      }
    }
  }

  sortData(sort: Sort) {
    const data = this.listClientArticles.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'article':
          return this.compare(a.article.description, b.article.description, isAsc);
        case 'client':
          return this.compare(a.client.name, b.client.name, isAsc);
        default:
          return 0;
      }
    });
  }
}
