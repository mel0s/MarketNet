import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Store } from 'app/interfaces/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  url = environment.urlApi + "Stores/";

  constructor(private http: HttpClient) {}


  getAllStores() {
    return this.http.get(this.url);
  }

  getStore(id:Number) {
    return this.http.get(this.url+id);
  }

  saveStore(store: Store) {
    return this.http.post(this.url, store);
  }

  updateStore(store: Store) {
    return this.http.put(this.url+ store.id, store);
  }

  deleteStore(id:Number) {
    return this.http.delete(this.url + id);
  }
}
