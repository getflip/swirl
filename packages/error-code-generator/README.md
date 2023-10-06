# Error Code Generator Library

## Overview

Error Code Generator is a TypeScript library aimed at simplifying the process of
managing and generating error codes in a systematic manner across different
programming languages in your projects. This allows you to create, manage, and
implement error codes efficiently, ensuring coherent error management throughout
your applications.

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
   TypeScript or Dart generators.

2. **Configuration:**

   - Set the source path:

     ```typescript
     generator.setSourcePath("[your-source-path]");
     ```

   - Set the output directory:

     ```typescript
     generator.setOutputDirectory("[your-output-directory]");
     ```

   - Optionally, add more code generators:

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

### Additional Elements

- **CodeGeneratorFactory:** A factory to instantiate and manage various code
  generators, facilitating easy extension to support additional languages in the
  future.

## Example Usage

```typescript
// Usage Example
const generator = new ErrorCodeGenerator([
  CodeGeneratorFactory.createGenerator("TypeScript"),
  CodeGeneratorFactory.createGenerator("Dart"),
])
  .setSourcePath("[your-source-path]")
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
