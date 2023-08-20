import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientArticle } from '@app/interfaces/ClientArticle';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientArticleService {

  url = environment.urlApi + "ClientArticles/";

  constructor(private http: HttpClient) {}


  getClient(id: Number) {
    return this.http.get(this.url + id);
  }

  getAllClientArticles() {
    return this.http.get(this.url );
  }

  saveClientArticles(client: ClientArticle) {
    return this.http.post(this.url, client,{
      headers:{
        'Content-Type': 'application/json',
        "Accept":"*/*"
      }
    });
  }

  updateClientArticles(client: ClientArticle) {
    return this.http.put(this.url+ client.id, client);
  }

  deleteClientArticles(id:Number) {
    return this.http.delete(this.url + id);
  }
}
