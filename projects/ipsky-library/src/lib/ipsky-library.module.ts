import { NgModule } from '@angular/core';
import { AddressModule } from './components/address';
import { IpskyPipesModule } from './pipes';
import { IpskyDirectivesModule } from './directives';
import { DialogModule } from './components/dialog';

export * from './components/address';
export * from './pipes';
export * from './directives';
export * from './components/dialog';
@NgModule({
  imports: [],
  exports: [AddressModule, IpskyPipesModule, IpskyDirectivesModule, DialogModule],
  declarations: [],
  providers: []
})
export class IpskyLibraryModule {}
