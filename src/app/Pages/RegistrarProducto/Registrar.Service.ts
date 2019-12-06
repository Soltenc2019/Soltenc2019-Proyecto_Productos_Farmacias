import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Producto } from './producto.model';
import {NgModule} from '@angular/core';
import {Globals} from '../../Share/Global';

const httpOptions = {
  headers: new HttpHeaders({
  'content-Type': 'application/json'
})
};
@NgModule({
  providers: [Globals ], // this depends on situation, see below
  imports: [
  
  ]
})

@Injectable({
    providedIn: 'root'
})
export class RegistrarService{
   
    constructor(private http: HttpClient,private globals : Globals){ }
    configUrl=this.globals.urlService +'productos';
      getProductos(){
        return this.http.get<any>(this.configUrl,httpOptions);
      }

      getProductosId(id){
        return this.http.get<any>(this.configUrl+"/"+id,httpOptions);
      }
      deleteProductosId(id){

        return this.http.delete<any>(this.configUrl+"/"+id,httpOptions);
      }
      postProducto(producto: Producto){
        let body = JSON.stringify(producto);
        return this.http.post<any>(this.configUrl,body,httpOptions);
      }

      updateProducto(id,producto: Producto){
        let body = JSON.stringify(producto);
        return this.http.patch<any>(this.configUrl+"/"+id,body,httpOptions);
      }
    }