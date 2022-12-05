export interface SwirlComponent {
  filePath: string;
  encapsulation: string;
  tag: string;
  docs: string;
  docsTags: DocsTag[];
  props: Prop[];
  methods: Method[];
  listeners: Listener[];
  styles: any[];
  slots: Slot[];
  parts: Slot[];
  dependents: string[];
  dependencies: string[];
  dependencyGraph: DependencyGraph;
}

export interface SwirlComponentCodePreview extends SwirlComponent {
  innerHtml: string;
}

export interface DependencyGraph {
  [key: string]: string[];
}

export interface DocsTag {
  name: string;
  text?: string;
}

export interface Slot {
  name: string;
  docs: string;
}

export interface Method {
  name: string;
  returns: Returns;
  signature: string;
  parameters: any[];
  docs: string;
  docsTags: DocsTag[];
}

export interface Returns {
  type: string;
  docs: string;
}

export interface Prop {
  name: string;
  type: string;
  mutable: boolean;
  attr: string;
  reflectToAttr: boolean;
  docs: string;
  docsTags: any[];
  values: Value[];
  optional: boolean;
  required: boolean;
  default?: any;
}

export interface Value {
  type: string;
}

export interface Listener {
  event: string;
  target: string;
  capture: boolean;
  passive: boolean;
}
