import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpskyLibrayModule } from 'ipsky-library';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NzMenuModule} from 'ng-zorro-antd/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PerfectScrollbarModule,
    NzMenuModule,
    AppRoutingModule,
    IpskyLibrayModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
