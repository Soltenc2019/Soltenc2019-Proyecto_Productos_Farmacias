import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Farmacia } from './farmacia.model';

const httpOptions = {
  headers: new HttpHeaders({
  'content-Type': 'application/json'
})
};

@Injectable({
    providedIn: 'root'
})
export class RegistrarService{
    configUrl='http://localhost:3000/farmacias';
    constructor(private http: HttpClient){ }
    


    getFarmacias(){
        return this.http.get<any>(this.configUrl,httpOptions);
      }

      getFarmaciasId(id){
        return this.http.get<any>(this.configUrl+"/"+id,httpOptions);
      }
      deleteFarmaciaId(id){
        return this.http.delete<any>(this.configUrl+"/"+id,httpOptions);
      }
      postFarmacia(farmacia: Farmacia){
        let body = JSON.stringify(farmacia);
        console.log("body :"+body);

        return this.http.post<any>(this.configUrl,body,httpOptions);
      }

      updateFarmacia(id,farmacia: Farmacia){
        let body = JSON.stringify(farmacia);
        console.log("body :"+body);

        return this.http.patch<any>(this.configUrl+"/"+id,body,httpOptions);
      }
    }