import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { Client } from "app/interfaces/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.urlApi + "Clients/";

  constructor(private http: HttpClient) {}


  getClient(id: Number) {
    return this.http.get(this.url + id);
  }

  getAllClients() {
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
