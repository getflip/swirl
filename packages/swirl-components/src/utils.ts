export function storybookArgsToProps(args: { [arg: string]: any }): string {
  return Object.entries(args)
    .map(
      ([key, value]) =>
        `${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}="${value}"`
    )
    .join(" ");
}
