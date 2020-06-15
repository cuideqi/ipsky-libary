import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AddressComponent } from './address.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule, NzSelectModule, NzInputModule],
  exports: [AddressComponent],
  declarations: [AddressComponent],
  providers: []
})
export class AddressModule {}
