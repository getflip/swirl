import { NgModule } from "@angular/core";

import { DIRECTIVES } from "./stencil-generated";
import { BooleanValueAccessor } from "./stencil-generated/boolean-value-accessor";

@NgModule({
  declarations: [...DIRECTIVES, BooleanValueAccessor],
  imports: [],
  exports: [...DIRECTIVES, BooleanValueAccessor],
})
export class SwirlComponentsModule {}
