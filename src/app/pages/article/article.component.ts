import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StatusForm } from 'app/enum/StatusForm';
import { Article } from 'app/interfaces/Article';
import { ArticleService } from 'app/service/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  id=0;
  options: string[] = ['code', 'description', 'price', "stock", "actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tabla', {static:true}) tabla: MatTable<any >;
  dataSource!: any;


  statusForm: StatusForm = StatusForm.SAVE;
  myForm: FormGroup;
  listArticles: Array<Article>  = [];
  sortedData : Article[];

  itemSelected! : Article ;

  constructor(private articleService: ArticleService) { }

  get code(){
    return this.myForm.get('code');
  }

  get description(){
    return this.myForm.get('description');
  }

  get price(){
    return this.myForm.get('price');
  }

  get stock(){
    return this.myForm.get('stock');
  }

  

  asignForm(item: Article){
    this.myForm.setValue(item);

  }

  clearForm(){
    this.myForm.reset();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  createTable() {
    this.dataSource = new MatTableDataSource(this.listArticles);
    this.dataSource.sort = this.sort;
  }

  editItem(item:Article){
    this.id = item.id
    this.itemSelected = item;
    delete item.id;
    this.statusForm = StatusForm.UPDATE;
    this.asignForm(item);
  }

  getAllArticles(){

    let myObserver = {
      next:(value: Array<Article>)=>{
        this.listArticles = value;
        this.createTable();
      }
    };
    this.articleService
    .getAllArticles()
    .subscribe(myObserver);
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.createTable();
      this.getAllArticles();
    });
    
    
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      code: new FormControl('',[ 
        Validators.required,
        Validators.minLength(9),
      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ]),
      price: new FormControl(0,[
        Validators.required,
        Validators.pattern(/^[1-9]\d*(\.\d+)?$/)
      ]),
      stock: new FormControl(0,[
        Validators.required,
        Validators.pattern(/^[0-9]*$/)
      ])
    });
    this.getAllArticles();
    this.createTable();
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {

      let myObserver = {
        next:(value: Article)=>{
          this.getAllArticles();
          this.clearForm();
        }
      };

      if (this.statusForm === StatusForm.SAVE) {
        this.articleService
        .saveArticle({
          code: this.code.value,
          description: this.description.value,
          price: Number(this.price.value),
          stock: Number(this.stock.value),
        })
        .subscribe(myObserver);
      }
      else if (this.statusForm === StatusForm.UPDATE) {
        this.articleService.updateArticle({
          id:this.id,
          code: this.code.value,
          description: this.description.value,
          price: Number(this.price.value),
          stock: Number(this.stock.value),
        })
        .subscribe(myObserver);
      }
    }
  }

  sortData(sort: Sort) {
    const data = this.listArticles.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'code':
          return this.compare(a.code, b.code, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        case 'description':
          return this.compare(a.description, b.description, isAsc);
        case 'stock':
          return this.compare(a.stock, b.stock, isAsc);
        default:
          return 0;
      }
    });
  }

  
}
