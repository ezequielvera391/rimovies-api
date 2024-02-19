export function parseEnvValueToInt (port: string | undefined): number | undefined {
  if (port !== null && port !== undefined) {
    return parseInt(port)
  }
}
