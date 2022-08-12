import { NgModule } from '@angular/core';
import { defineCustomElements } from '@getflip/swirl-components/loader';

import { DIRECTIVES } from './stencil-generated';

defineCustomElements(window);

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES],
})
export class SwirlComponentsModule {}
