const debug = process?.env?.NODE_ENV === "development";

export function log(message: string, details: unknown) {
  if (debug) {
    console.log(`${message} – `, details);
  }
}
