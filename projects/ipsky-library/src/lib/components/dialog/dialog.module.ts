import { NgModule } from '@angular/core';
import { DIALOG_SERVICE_PROVIDE } from './imp/dialog.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';

@NgModule({
  declarations: [DialogContainerComponent],
  providers: [DIALOG_SERVICE_PROVIDE],
  imports: [OverlayModule, DragDropModule],
  entryComponents: [DialogContainerComponent]
})
export class DialogModule {
  constructor() {}
}
