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

  getListClient() {
    return this.http.get(this.url + "list/");
  }

  
  getAllClients() {
    return this.http.get(this.url);
  }

  saveClient(client: Client) {
    return this.http.post(this.url, client,{
      headers:{
        'Content-Type': 'application/json',
        "Accept":"*/*"
      }
    });
  }

  updateClient(client: Client) {
    return this.http.put(this.url+ client.id, client);
  }

  deleteClient(id:Number) {
    return this.http.delete(this.url + id);
  }


}
