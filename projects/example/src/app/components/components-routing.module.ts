import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddressExampleComponent } from './address-example/address-example.component';

const routes: Routes = [
  {
    path: 'address',
    component: AddressExampleComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ComponentsRoutingModule { }
