export function parseBufferToBool (rows: any[]): any[] {
  return rows.map(row => {
  // Recorrer todas las claves de la fila
    Object.keys(row).forEach(key => {
      if (Buffer.isBuffer(row[key])) {
        const wasWatched = Boolean(row[key][0])
        row[key] = wasWatched
      }
    })
    return row
  })
}
