import { RowDataPacket } from 'mysql2/promise'
import pool from '../database'

export const insertActorsMoviesRelations = async (movieId: number, actorIds: number[]): Promise<void> => {
  const values = actorIds.map(actorId => [movieId, actorId])
  await pool.query('INSERT INTO actorsmovies (movie_id, actor_id) VALUES ?', [values])
}

export const updateActorsMoviesRelations = async (movieId: number, newActorIds: number[]): Promise<void> => {
  try {
    // Obtener las relaciones existentes para la película de la base de datos
    const [existingRelations] = await pool.query<RowDataPacket[]>(
      'SELECT actor_id FROM actorsmovies WHERE movie_id = ?',
      [movieId]
    )

    // Mapeo de las relaciones obtenidas al tipo definido
    const relations: Array<{ actor_id: number }> = existingRelations.map(
      (row: RowDataPacket) => ({
        actor_id: row.actor_id
      })
    )

    const existingActorIds = relations.map(relation => relation.actor_id)

    // Encontrar nuevas relaciones que deben agregarse
    const actorIdsToAdd = newActorIds.filter(actorId => !existingActorIds.includes(actorId))

    // Encontrar relaciones existentes que deben eliminarse
    const actorIdsToRemove = existingActorIds.filter(actorId => !newActorIds.includes(actorId))

    // Insertar nuevas relaciones
    if (actorIdsToAdd.length > 0) {
      await addNewActors(actorIdsToAdd, movieId)
    }

    // Eliminar relaciones existentes
    if (actorIdsToRemove.length > 0) {
      await removeActors(actorIdsToRemove, movieId)
    }
  } catch (error) {
    // Manejar el error aquí
    console.error('Error updating actors-movies relations:', error)
    throw new Error('Error updating actors-movies relations')
  }
}

async function addNewActors (arr: any[], id: number): Promise<void> {
  const valuesToAdd = arr.map(actorId => [id, actorId])
  await pool.query('INSERT INTO actorsmovies (movie_id, actor_id) VALUES ?', [valuesToAdd])
}

async function removeActors (arr: any[], id: number): Promise<void> {
  await pool.query('DELETE FROM actorsmovies WHERE movie_id = ? AND actor_id IN (?)', [id, arr])
}
