# Error Code Generator Library for Open API Specs

## Overview

Error Code Generator is a TypeScript library aimed at simplifying the process of
managing and generating error codes in a systematic manner across different
programming languages in your projects. This allows you to create, manage, and
implement error codes efficiently, ensuring coherent error management throughout
your applications. Define the error codes in your OpenAPI specification, and the
library will generate the associated code in the languages of your choice.

## Installation

Ensure to import the main class and the relevant factory for a seamless
integration:

```typescript
import {
  ErrorCodeGenerator,
  CodeGeneratorHandler,
} from "@getflip/error-code-generator";
```

## Key Components

### ErrorCodeGenerator

#### Overview

`ErrorCodeGenerator` is the pivotal class responsible for orchestrating the
error code generation process. This class coordinates with various handlers,
ensuring a systematic workflow from extracting error codes to generating the
associated TypeScript code and writing them to files.

#### Usage

1. **Initialization:**

   Instantiate the `ErrorCodeGenerator` with an array of code generators:

   ```typescript
   const generator = new ErrorCodeGenerator(codeGenerators);
   ```

   Where `codeGenerators` contains instances of code generators, such as
   TypeScript or Dart generators. The `codeGenerators` array can be created
   through the CodeGeneratorFactory. There are two languages supported at the
   moment: TypeScript and Dart.

   ```typescript
   const codeGenerators = [
     CodeGeneratorFactory.createGenerator("TypeScript"),
     CodeGeneratorFactory.createGenerator("Dart"),
   ];

   // or
   const generator = new ErrorCodeGenerator([
     CodeGeneratorFactory.createGenerator("TypeScript"),
     CodeGeneratorFactory.createGenerator("Dart"),
   ]);
   ```

2. **Configuration:** The Error Code Generator requires a few configurations to
   be set before running the generation process. These configurations are:

   - Set the source path:

     ```typescript
     generator.setSourcePath("[your-openapi-spec-source-path]");
     ```

   - Set the output directory:

     ```typescript
     generator.setOutputDirectory("[your-output-directory]");
     ```

   - Optionally, add more code generators, in case you need additional
     languages:

     ```typescript
     generator.addCodeGenerators(additionalCodeGenerators);
     ```

3. **Generate Error Codes:**

   Kickstart the error code generation process by invoking:

   ```typescript
   generator.generate();
   ```

   Ensure all mandatory configurations are set before invoking the `generate`
   method. Otherwise, an error will be thrown indicating the absence of
   necessary configurations.

### Handlers

- **ErrorCodeExtractorHandler:** Extracts error codes from a source file.
- **CodeGeneratorHandler:** Generates code, based on the extracted error codes.
- **FileWriterHandler:** Writes the generated code to files in a specified
  directory.

### Adding Code Generators

The Error Code Generator library supports TypeScript and Dart code generation
out of the box through the `TypeScriptCodeGenerator` and `DartCodeGenerator`
classes. However, the library is designed to be extensible, allowing you to add
support for additional languages. To add support for a new language, you need to
create a new class that implements the `CodeGenerator` interface. The interface
contains a single method, `generate`, which takes in an array of `ErrorCode`
objects and returns a string containing the generated code.

- **CodeGeneratorFactory:** A factory to instantiate and manage various code
  generators, facilitating easy extension to support additional languages in the
  future.

- **CodeGenerator:** An interface that defines the contract for code generators.
  The interface contains a single method, `generate`, which takes in an array of
  `ErrorCode` objects and returns a string containing the generated code.
  ```typescript
  export interface CodeGenerator {
    language: string;
    fileExtension: string;
    generateCode(): GeneratedCode;
    setEndpointErrorCollection(
      errorCollection: EndpointErrorCollection
    ): CodeGenerator;
  }
  ```

## Example Usage

The following example demonstrates how to use the Error Code Generator library.
As it is build with the help of the Builder pattern, you can chain the methods
to set the configurations and generate the error codes.

```typescript
const generator = new ErrorCodeGenerator([
  CodeGeneratorFactory.createGenerator("TypeScript"),
  CodeGeneratorFactory.createGenerator("Dart"),
])
  .setSourcePath("[your-openapi-spec-source-path]")
  .setOutputDirectory("[your-output-directory]")
  .generate();
```

Ensure to replace placeholders such as `[your-source-path]` and
`[your-output-directory]` with actual paths relevant to your project.

## Contributing and Extending

Extend and customize `ErrorCodeGenerator` and associated handlers to accommodate
any project-specific requirements. Any contributions, feature requests, and
issue tracking are welcome! To get started with contributing, please refer to
our [contribution guide]([link-to-guide]).

## License

This library is licensed under [Your License Name]. For more details, see the
LICENSE file in the repository.

---

Feel free to modify documentation according to any specific features or nuances
of the library, providing accurate links, paths, and guidelines for developers
and users.
