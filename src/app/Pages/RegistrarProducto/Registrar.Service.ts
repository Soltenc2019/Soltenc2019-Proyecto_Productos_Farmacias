import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Producto } from './producto.model';

const httpOptions = {
  headers: new HttpHeaders({
  'content-Type': 'application/json'
})
};

@Injectable({
    providedIn: 'root'
})
export class RegistrarService{
    configUrl='http://localhost:3000/productos';
    constructor(private http: HttpClient){ }

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