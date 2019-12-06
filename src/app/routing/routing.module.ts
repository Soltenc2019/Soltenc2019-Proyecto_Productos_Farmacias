import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../Pages/home/home.component';
import { RegistrarComponent } from '../Pages/RegistrarProducto/registrar.component';
import { NuevoComponent } from '../Pages/NuevoProducto/nuevo.component';
import { RegistrarfarmaciaComponent } from '../Pages/RegistrarFarmacia/registrarfarmacia.component';
import { NuevofarmaciaComponent } from '../Pages/NuevoFarmacia/nuevofarmacia.component'; 

const routes: Routes = [
  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'registrar', component: RegistrarComponent},
  { path: 'nuevo', component: NuevoComponent},
  { path: 'registrarfarmacia', component: RegistrarfarmaciaComponent},
  { path: 'nuevofarmacia', component: NuevofarmaciaComponent} 
];
 
@NgModule({
  imports: [  
    CommonModule,
    RouterModule.forRoot(routes)
  ],  
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
export const routingComponents=[
  HomeComponent,
  RegistrarComponent,
  NuevoComponent,
  RegistrarfarmaciaComponent,
  NuevofarmaciaComponent
]