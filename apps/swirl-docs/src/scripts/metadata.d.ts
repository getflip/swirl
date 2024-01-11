// metadata.d.ts
declare module "@getflip/swirl-icons/dist/metadata" {
  export interface IconMetaData {
    id: string;
    name: string;
    description?: string;
    usage: string[];
    keywords: string[];
  }

  const metadata: { [key: string]: IconMetaData };
  export = metadata;
}
