import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressExampleComponent } from './address-example/address-example.component';
import { ComponentsRoutingModule } from './components-routing.module';



@NgModule({
  declarations: [AddressExampleComponent],
  imports: [
    CommonModule, ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
