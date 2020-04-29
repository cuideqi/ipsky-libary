import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressComponent } from './address.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, FormsModule, NzSelectModule],
  exports: [AddressComponent],
  declarations: [AddressComponent],
  providers: [],
})
export class AddressModule { }
