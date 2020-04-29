import { NgModule } from '@angular/core';
import { DebounceClickDirective } from './debounce-click.directive';
import { TextWrappingDirective } from './text-wrapping.directive';

const DIRECTIVES = [DebounceClickDirective, TextWrappingDirective];
@NgModule({
  imports: [],
  exports: [DIRECTIVES],
  declarations: [DIRECTIVES],
  providers: [],
})
export class DirectivesModule { }
