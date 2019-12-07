import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import Swal from 'sweetalert2';
import {RegistrarService} from './Registrar.Service';
import {Farmacia} from './farmacia.model';
import {FarmaciaClass} from './farmacia.class';
import {FormControl, Validators} from '@angular/forms';

let ELEMENT_DATA: Farmacia[] = [

];

@Component({
  selector: 'app-registrarfarmacia',
  templateUrl: './registrarfarmacia.component.html',
  styleUrls: ['./registrarfarmacia.component.css']
})


export class RegistrarfarmaciaComponent implements OnInit {
    displayedColumns: string[] = ['id', 'co_Cif' , 'no_Farmacia', 'modificar', 'eliminar'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
  
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
  
    constructor(public dialog: MatDialog,private RegistrarService: RegistrarService) {}
    
    dataLength: any= ELEMENT_DATA.length;
    newDataID: any;
    dataValue:any;
  
    // NuevaFarmacia(): void {
  
    //   let dialogRef = this.dialog.open(NuevofarmaciaComponent, {
    //     width: '80%',
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //   });
    // }

    ngOnInit() {
      this.DataFarmacia();
    }

    refrescar(){
      this.DataFarmacia();
    }

    //GET
    public CompararFound:any[];
    DataFarmacia(){
  
      this.RegistrarService.getFarmacias().subscribe(res=>{
        this.CompararFound=res;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data =  this.CompararFound[0];
        ELEMENT_DATA=this.CompararFound[0];
        
  
      });
      
    }
    // GET POR ID
    public CompararFoundById:any[];
    DataCompararById(data): void{
      this.RegistrarService.getFarmaciasId(data).subscribe(res=>{
        this.CompararFoundById=res;
        this.dataValue = this.CompararFoundById[0];
        console.log( this.dataValue);
        this.dialog.open(DialogModificarFarmacia, {
          width: '70%',
          data: this.dataValue
        }).afterClosed().subscribe(result => {
          if(result){
            if(!data){
              // TodoData.push(result);
            }else{
            this.CompararFoundById[0].id = result.id;
            this.CompararFoundById[0].co_Producto = result.co_Producto;
            this.CompararFoundById[0].no_Producto = result.no_Producto;
            this.CompararFoundById[0].no_Principio_Activo = result.no_Principio_Activo;   
            this.CompararFoundById[0].co_Categoria = result.co_Categoria;
            this.CompararFoundById[0].co_SubCategoria = result.co_SubCategoria;   
            this.CompararFoundById[0].co_Unidad = result.co_Unidad;
            this.CompararFoundById[0].qt_Precio = result.qt_Precio;   
            }
          }
          this.refrescar();
        });
        
      });
      
    }

    DataCompararDeleteById(data): void{

      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        showCancelButton: true,
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!'
      }).then((result) => {
        if (result.value) {
          this.RegistrarService.deleteFarmaciaId(data).subscribe(res=>{
            this.refrescar();
        });
          Swal.fire(
            '¡Eliminado!',
            'Su producto ha sido eliminado.',
            'success'
          )
        }
      })
  
      
  
  }
    NuevaFarmacia(): void {

      this.dialog.open(DialogAgregarFarmacia, {
         width: '65%',
       }).afterClosed().subscribe(result => {
         this.refrescar();
       });
     }
}

//Modificar Farmacia

@Component({
  selector: 'dialog-modificar-farmacia',
  templateUrl: 'DialogoModificarFarmacia.html',
})
export class DialogModificarFarmacia {

  constructor(private RegistrarService: RegistrarService,
    public dialogRef: MatDialogRef<DialogModificarFarmacia>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    public Farmacia = new FarmaciaClass
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  mensajeExito(){
    Swal.fire ('','Se Actualizo correctamente','success')
  }

  mensajeRellenarData(){
    Swal.fire({
      type: 'error',
      title: 'Ups ...',
      text: 'Verifique los datos'
    })
  }

  

    ActualizarProducto(Farmacia): void{
      let farmacia: Farmacia;
      var id:number;
      id=this.data[0].id;
      farmacia = {
        id:this.data[0].id,
        co_Farmacia: this.data[0].co_Farmacia,
        co_Cif:this.data[0].co_Cif,
        no_Farmacia:Farmacia[0].no_Farmacia,
        no_Contacto:Farmacia[0].no_Contacto,
        no_Correo:Farmacia[0].no_Correo,
        nu_Telefono:Farmacia[0].nu_Telefono,
        nu_Movil:Farmacia[0].nu_Movil,
        no_Calle:Farmacia[0].no_Calle,
        no_Pais:Farmacia[0].no_Pais,
        no_Municipio:Farmacia[0].no_Municipio,
        co_Postal:Farmacia[0].co_Postal
    };
      console.log(farmacia);


    if (!Farmacia[0].no_Farmacia || !Farmacia[0].no_Contacto || !Farmacia[0].no_Correo || 
      !Farmacia[0].nu_Telefono || !Farmacia[0].nu_Movil || !Farmacia[0].no_Calle || 
      !Farmacia[0].no_Pais || !Farmacia[0].no_Municipio || !Farmacia[0].co_Postal) {
      this.mensajeRellenarData();
    } else {
      this.RegistrarService.updateFarmacia(id,farmacia).subscribe(res=>{
        this.mensajeExito(); 
        this.onNoClick();
      });
    }
  

    
    }

}

//Agregar Farmacia
@Component({
  selector: 'dialog-agregar-farmacia',
  templateUrl: 'DialogoAgregarFarmacia.html',
})
export class DialogAgregarFarmacia {

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

  postalFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(7),
  ]);

  municipioFormControl= new FormControl('', [
    Validators.required,
    
  ]);

  paisFormControl= new FormControl('', [
    Validators.required,
    
  ]);

  calleFormControl= new FormControl('', [
    Validators.required,
  ]);

  contactoFormControl= new FormControl('', [
    Validators.required,
  ]);

  noFarmaciaFormControl= new FormControl('', [
    Validators.required,
  ]);

  cifFarmaciaFormControl= new FormControl('', [
    Validators.required,
    Validators.maxLength(11),
  ]);

  coFarmaciaFormControl= new FormControl('', [
    Validators.required,
  ]);


  constructor(private RegistrarService: RegistrarService,
    public dialogRef: MatDialogRef<DialogAgregarFarmacia>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    co_Farmacia : string;
    co_Cif : string;
    no_Farmacia : string;
    no_Contacto : string;
    no_Correo : string ;
    nu_Telefono: number;
    nu_Movil:number;
    no_Direccion:string;
    no_Calle:string;
    no_Pais:string;
    no_Municipio:string;
    co_Postal:number;


    public Farmacia = new FarmaciaClass
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  mensajeExito(){
    Swal.fire ('','Se Agrego correctamente','success')
  }
  CloseDialog(): void {
    this.dialogRef.close();
  }

  mensajeRellenarData(){
    Swal.fire({
      type: 'error',
      title: 'Ups ...',
      text: 'Verifique los datos'
    })
  }

  InsertarFarmacia(){
    try {
      let farmacia: Farmacia;
      farmacia = {
          id:0,
          co_Farmacia: this.co_Farmacia,
          co_Cif:this.co_Cif,
          no_Farmacia:this.no_Farmacia,
          no_Contacto:this.no_Contacto,
          no_Correo:this.no_Correo,
          nu_Telefono:this.nu_Telefono,
          nu_Movil:this.nu_Movil,
          no_Calle:this.no_Calle,
          no_Pais:this.no_Pais,
          no_Municipio:this.no_Municipio,
          co_Postal:this.co_Postal
      };
  
      if (!this.co_Farmacia || !this.co_Cif || !this.no_Farmacia 
        || !this.no_Contacto || !this.no_Correo || !this.nu_Telefono
        || !this.nu_Movil || !this.no_Calle || !this.no_Pais
        || !this.no_Municipio || !this.co_Postal) {
          this.mensajeRellenarData();
      } else{
        
        this.RegistrarService.postFarmacia(farmacia).subscribe(res=>{ 
          this.mensajeExito();
          this.CloseDialog();
        });
      }
    } catch (error) {
      
    }
  }



}
 