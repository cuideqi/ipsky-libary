import { NgModule } from '@angular/core';
import { AddressModule } from './components/address';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';


@NgModule({
  imports: [],
  exports: [AddressModule, PipesModule, DirectivesModule],
  declarations: [],
  providers: [],
})
export class IpskyLibrayModule { }
