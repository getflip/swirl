import { NgModule } from "@angular/core";

import { DIRECTIVES } from "./stencil-generated";
import { BooleanValueAccessor } from "./stencil-generated/boolean-value-accessor";
import { TextValueAccessor } from "./stencil-generated/text-value-accessor";

@NgModule({
  declarations: [...DIRECTIVES, BooleanValueAccessor, TextValueAccessor],
  imports: [],
  exports: [...DIRECTIVES, BooleanValueAccessor, TextValueAccessor],
})
export class SwirlComponentsModule {}
