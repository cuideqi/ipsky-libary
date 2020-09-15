import { NgModule } from '@angular/core';
import { DialogModule } from 'ipsky-library/components/dialog';
import { AddressModule } from 'ipsky-library/components/address';
import { IpskyPipesModule } from 'ipsky-library/pipes';
import { IpskyDirectivesModule } from 'ipsky-library/directives';

export * from 'ipsky-library/components/address';
export * from 'ipsky-library/pipes';
export * from 'ipsky-library/directives';
export * from 'ipsky-library/components/dialog';
@NgModule({
  imports: [],
  exports: [AddressModule, IpskyPipesModule, IpskyDirectivesModule, DialogModule],
  declarations: [],
  providers: []
})
export class IpskyLibraryModule {}
