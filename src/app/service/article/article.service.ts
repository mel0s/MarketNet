import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Article } from "app/interfaces/Article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = environment.urlApi + "Articles/";

  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get(this.url);
  }


  getArticle(id:Number) {
    return this.http.get(this.url + id);
  }


  saveArticle(article: Article) {
    return this.http.post(this.url, article);
  }

  updateArticle(article: Article) {
    return this.http.put(this.url+ article.id, article);
  }

  deleteArticle(id:Number) {
    return this.http.delete(this.url + id);
  }


}
