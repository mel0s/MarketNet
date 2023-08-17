import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.urlApi;

  constructor(private http: HttpClient) {}


  getClient() {
    return this.http.get(this.url);
  }

  saveClient(client: Client) {
    return this.http.post(this.url, client);
  }

  updateClient(client: Client) {
    return this.http.put(this.url+ client.id, client);
  }

  deleteClient(id:Number) {
    return this.http.delete(this.url + id);
  }


}
