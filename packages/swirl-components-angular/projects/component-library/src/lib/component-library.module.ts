import { NgModule } from "@angular/core";

import { DIRECTIVES } from "./stencil-generated";
import { TextValueAccessor } from "./stencil-generated/text-value-accessor";

@NgModule({
  declarations: [...DIRECTIVES, TextValueAccessor],
  imports: [],
  exports: [...DIRECTIVES, TextValueAccessor],
})
export class SwirlComponentsModule {}
