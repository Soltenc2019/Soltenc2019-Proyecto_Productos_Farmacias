import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modificarfarmacia',
  templateUrl: './modificarfarmacia.component.html',
  styleUrls: ['./modificarfarmacia.component.css']
})


export class ModificarfarmaciaComponent implements OnInit {

  foods: Food[] = [
    {value: 'belleza', viewValue: 'Belleza'},
    {value: 'bienestarsex', viewValue: 'Bienestar Sexual'},
    {value: 'cuidadoper', viewValue: 'Cuidado Personal'},    
    {value: 'farmasalud', viewValue: 'Farmacia y Salud'},
    {value: 'mamabebe', viewValue: 'Mamá y Bebé'},
    {value: 'vitasuple', viewValue: 'Vitaminas / Suplementos'},
    {value: 'electrobe', viewValue: 'Electrobelleza'}
  ];

  constructor() { 
   
  }

  ngOnInit() {
    
  }

  mensaje(){
    Swal.fire ('','Se modifico correctamente','success')
  }

}