export function log(message: string, details: unknown) {
  const debug = window.flipBridgeOptions?.debug;

  if (debug) {
    console.log(`${message} – `, details);
  }
}
