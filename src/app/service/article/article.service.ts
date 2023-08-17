import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = environment.urlApi;
  constructor(private http: HttpClient) { }

  getArticle() {
    return this.http.get(this.url);
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
