import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddressExampleComponent } from './address-example/address-example.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

const routes: Routes = [
  {
    path: 'address',
    component: AddressExampleComponent
  },
  {
    path: 'dialog',
    component: DialogExampleComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ComponentsRoutingModule {}
