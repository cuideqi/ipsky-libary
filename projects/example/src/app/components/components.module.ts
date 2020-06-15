import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressExampleComponent } from './address-example/address-example.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { IpskyLibrayModule, DialogModule } from 'ipsky-library';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

@NgModule({
  declarations: [AddressExampleComponent, DialogExampleComponent],
  imports: [IpskyLibrayModule, DialogModule, CommonModule, ComponentsRoutingModule]
})
export class ComponentsModule {}
