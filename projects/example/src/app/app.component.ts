import { Component, ViewChild } from '@angular/core';
import {PerfectScrollbarDirective, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mainBar', {static: false}) mainBar: PerfectScrollbarDirective;
  scrollConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
  };
}
