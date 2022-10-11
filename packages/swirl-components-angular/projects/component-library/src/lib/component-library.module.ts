import { NgModule } from "@angular/core";

import { DIRECTIVES } from "./stencil-generated";
import { BooleanValueAccessor } from "./stencil-generated/boolean-value-accessor";
import { SelectValueAccessor } from "./stencil-generated/select-value-accessor";
import { TextValueAccessor } from "./stencil-generated/text-value-accessor";

@NgModule({
  declarations: [
    ...DIRECTIVES,
    BooleanValueAccessor,
    SelectValueAccessor,
    TextValueAccessor,
  ],
  imports: [],
  exports: [
    ...DIRECTIVES,
    BooleanValueAccessor,
    SelectValueAccessor,
    TextValueAccessor,
  ],
})
export class SwirlComponentsModule {}
