import { NgModule } from '@angular/core';
import { StrToArrPipe } from './str-to-arr.pipe';

const PIPES = [StrToArrPipe];
@NgModule({
  imports: [],
  exports: [PIPES],
  declarations: [PIPES],
  providers: []
})
export class IpskyPipesModule {}
