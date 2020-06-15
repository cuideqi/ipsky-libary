import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DialogService } from 'ipsky-library';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {
  @ViewChild('tpl') tpl: TemplateRef<any>;
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  showDialog() {
    console.log(this.dialogService);
    this.dialogService.createDialog({
      content: this.tpl
    });
  }
}
