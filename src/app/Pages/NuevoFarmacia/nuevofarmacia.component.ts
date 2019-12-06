import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Farmacia } from '../RegistrarFarmacia/farmacia.model';
import {RegistrarService} from '../RegistrarFarmacia/Registrar.Service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nuevofarmacia',
  templateUrl: './nuevofarmacia.component.html',
  styleUrls: ['./nuevofarmacia.component.css']
})


export class NuevofarmaciaComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  telefonoFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(7),
  ]);

  celularFormControl= new FormControl('', [
    Validators.required,
    Validators.maxLength(9),
  ]);

  direccionFormControl= new FormControl('', [
    Validators.required,
    
  ]);

  contactoFormControl= new FormControl('', [
    Validators.required,
  ]);

  noFarmaciaFormControl= new FormControl('', [
    Validators.required,
  ]);

  rucFarmaciaFormControl= new FormControl('', [
    Validators.required,
    Validators.maxLength(11),
  ]);

  coFarmaciaFormControl= new FormControl('', [
    Validators.required,
  ]);

  constructor(private RegistrarService: RegistrarService) { 
   
  }


    co_Farmacia : string;
    co_ruc : string;
    no_Farmacia : string;
    no_Contacto : string;
    no_Correo : string ;
    nu_Telefono: number;
    nu_celular:number;
    no_Direccion:string;

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
      let farmacia: Farmacia;
      farmacia = {
          id:0,
          co_Farmacia: this.co_Farmacia,
          co_ruc:this.co_ruc,
          no_Farmacia:this.no_Farmacia,
          no_Contacto:this.no_Contacto,
          no_Correo:this.no_Correo,
          nu_Telefono:this.nu_Telefono,
          nu_celular:this.nu_celular,
          no_Direccion:this.no_Direccion,
      };
  
      if (!this.co_Farmacia || !this.co_ruc || !this.no_Farmacia 
        || !this.no_Contacto || !this.no_Correo || !this.nu_Telefono
        || !this.nu_celular || !this.no_Direccion) {
          this.mensajeRellenarData();
      } else{
        
        this.RegistrarService.postFarmacia(farmacia).subscribe(res=>{ 
          this.mensaje();
        });
      }
    } catch (error) {
      
    }
  }

}