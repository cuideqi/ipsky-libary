import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpskyLibraryModule } from 'ipsky-library';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PerfectScrollbarModule,
    NzMenuModule,
    AppRoutingModule,
    IpskyLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
