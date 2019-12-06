import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {RegistrarService} from '../RegistrarProducto/Registrar.Service';
import { Producto } from '../RegistrarProducto/producto.model';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})


export class NuevoComponent implements OnInit {
  subCategoria = 'SBE001';

  public reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  coProd = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  noProd = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  no_PrincipioActivo=new FormControl('', [Validators.required, Validators.pattern(this.reg)]);

  ValidarCampos() {
    if (this.coProd) {
      return this.coProd.hasError('required') ? 'Campo requerido' :
      this.coProd.hasError('email') ? 'Not a valid url' :
        '';
    } 
  }

  constructor(private RegistrarService: RegistrarService) { 
   
  }

  co_Producto : string;
  no_Producto : string;
  no_Principio_Activo : string;
  co_Categoria='C001';
  co_SubCategoria : string ;
  co_Unidad='CJA';
  qt_Precio:number;

  ngOnInit() {

  }
  
  mensaje(){
    Swal.fire ('','Se grabo correctamente','success')
  }

  mensajeRellenarData(){
    Swal.fire({
      type: 'error',
      title: 'Ups ...',
      text: 'Verifique los datos'
    })
  }

  InsertarProducto(){

    try {
      let producto: Producto;
      producto = {
        id:0,
        co_Producto: this.co_Producto,
        no_Producto:this.no_Producto,
        no_Principio_Activo:this.no_Principio_Activo,
        co_Categoria:this.co_Categoria,
        co_SubCategoria:this.subCategoria,
        co_Unidad:this.co_Unidad,
        qt_Precio:this.qt_Precio,
    };

    if (!this.co_Producto || !this.no_Producto || !this.no_Principio_Activo 
      || !this.co_Categoria || !this.subCategoria || !this.co_Unidad
      || !this.qt_Precio) {
        this.mensajeRellenarData();
    } else{
      
      this.RegistrarService.postProducto(producto).subscribe(res=>{
        let array=res;
         console.log("array : "+ JSON.stringify(array));
        this.mensaje();
          
      });

    }

    } catch (error) {
      console.log(error);
    }
    
  }

}
