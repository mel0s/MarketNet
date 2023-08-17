import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Store } from 'app/interfaces/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  url = environment.urlApi;

  constructor(private http: HttpClient) {}


  getStore() {
    return this.http.get(this.url);
  }

  savestore(store: Store) {
    return this.http.post(this.url, store);
  }

  updateStore(store: Store) {
    return this.http.put(this.url+ store.id, store);
  }

  deleteStore(id:Number) {
    return this.http.delete(this.url + id);
  }
}
