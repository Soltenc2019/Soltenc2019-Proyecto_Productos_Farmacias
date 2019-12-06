import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {RegistrarService} from './Registrar.Service';
import {Producto} from './producto.model';
import {productoClase} from './producto.class';


let ELEMENT_DATA: Producto[] = [

];


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})


export class RegistrarComponent implements OnInit {


  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(public dialog: MatDialog,private RegistrarService: RegistrarService) {}
  

  co_Producto : string;
  no_Producto : string;
  no_Principio_Activo : string;
  co_Categoria : string;
  co_SubCategoria : string ;
  co_Unidad: string;
  qt_Precio:number;



  dataLength: any= ELEMENT_DATA.length;
  newDataID: any;
  dataValue:any;


  ngOnInit() {
    this.refrescar();
  }

  refrescar(){
    this.DataComparar();
  }

  mensaje(){
    Swal.fire ('','Se elimino correctamente','success')
  }

  
  displayedColumns: string[] = ['id','co_Producto', 'no_Producto', 'no_Principio_Activo', 'co_Categoria','co_SubCategoria', 'co_Unidad','qt_Precio', 'modificar', 'eliminar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  public CompararFound:any[];
  DataComparar(){

    this.RegistrarService.getProductos().subscribe(res=>{
      this.CompararFound=res;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data =  this.CompararFound[0];
      ELEMENT_DATA=this.CompararFound[0];
    });
    
  }
  

  public CompararFoundById:any[];
  DataCompararById(data): void{
    this.RegistrarService.getProductosId(data).subscribe(res=>{
      this.CompararFoundById=res;
      this.dataValue = this.CompararFoundById[0];
       this.dialog.open(DialogModificarProducto, {
        width: '60%',
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
        this.RegistrarService.deleteProductosId(data).subscribe(res=>{
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

NuevoProducto(): void {

 this.dialog.open(DialogAgregarProducto, {
    width: '70%',
  }).afterClosed().subscribe(result => {
    this.refrescar();
  });
}

}

//Para modificar Producto
@Component({
  selector: 'dialog-modificar-producto',
  templateUrl: 'DialogoModificarProducto.html',
})
export class DialogModificarProducto {

  constructor(private RegistrarService: RegistrarService,
    public dialogRef: MatDialogRef<DialogModificarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    IdProducto:number;
    public noProd:string;

    public Producto = new productoClase
    
  onNoClick(): void {
    this.dialogRef.close();
  }


  mensaje(){
    Swal.fire ('','Se Actualizo correctamente','success')
  }
  mensajeRellenarData(){
    Swal.fire({
      type: 'error',
      title: 'Ups ...',
      text: 'Verifique los datos'
    })
  }

    ActualizarProducto(Producto): void{
      let producto: Producto;
      var id:number;
      id=this.data[0].id;
      producto = {
        id:this.data[0].id,
        co_Producto: this.data[0].co_Producto,
        no_Producto:Producto[0].no_Producto,
        no_Principio_Activo:Producto[0].no_Principio_Activo,
        co_Categoria:Producto[0].co_Categoria,
        co_SubCategoria:Producto[0].co_SubCategoria,
        co_Unidad:Producto[0].co_Unidad,
        qt_Precio:Producto[0].qt_Precio,
    };

    if (!Producto[0].no_Producto || !Producto[0].no_Principio_Activo || !Producto[0].co_Categoria || 
      !Producto[0].co_SubCategoria || !Producto[0].co_Unidad || !Producto[0].qt_Precio) {
      this.mensajeRellenarData();
    } else {
      this.RegistrarService.updateProducto(id,producto).subscribe(res=>{
        this.mensaje(); 
        this.onNoClick();
      });
    }
  }
}

//Para registrar producto
@Component({
  selector: 'dialog-agregar-producto',
  templateUrl: 'DialogoAgregarProducto.html',
})
export class DialogAgregarProducto {
  subCategoria = 'SBE001';

  constructor(private RegistrarService: RegistrarService,
    public dialogRefAgregar: MatDialogRef<DialogAgregarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any,private changeDetectorRefs: ChangeDetectorRef) { }

  co_Producto : string;
  no_Producto : string;
  no_Principio_Activo : string;
  co_Categoria='C001';
  co_SubCategoria :string;
  co_Unidad='CJA';
  qt_Precio:number;

  CloseDialog(): void {
    this.dialogRefAgregar.close();
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
        this.CloseDialog();
      });

    }

    } catch (error) {
      console.log(error);
    }
    
  }
    
}




