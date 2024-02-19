import { MovieBody } from '../interfaces/movies.interface'
import { Response } from 'express'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import pool from '../database'
import { insertActorsMoviesRelations, updateActorsMoviesRelations } from '../services/actorsMovies.service'
import { parseBufferToBool } from '../helper/parsers'

export const getMovies = async (_req: any, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
         m.*, 
         JSON_ARRAYAGG(JSON_OBJECT('id', a.id, 'name', a.name)) AS actors
       FROM 
         movies m
       LEFT JOIN 
         actorsmovies am ON m.id = am.movie_id
       LEFT JOIN 
         actors a ON am.actor_id = a.id
       GROUP BY 
         m.id`
    )
    const moviesWithBool = parseBufferToBool(rows)
    res.json(moviesWithBool)
  } catch (error) {
    res.status(500).json({ error: 'not conection with database' })
  }
}

export const addMovie = async (req: any, res: Response): Promise<any> => {
  const movieData: MovieBody = req.body
  const { actors, ...movieDetails } = movieData
  try {
    const result = await pool.query<ResultSetHeader>('INSERT INTO movies SET ?', [movieDetails])
    const movieId = result[0].insertId

    await insertActorsMoviesRelations(movieId, movieData.actors)

    return res.json({ message: 'Movie successfully created' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Not conection with database' })
  }
}

export const updateMovie = async (req: any, res: Response): Promise<any> => {
  const movieData: MovieBody = req.body
  const { actors, ...movieDetails } = movieData
  const movieId: number = parseInt(req.params.id)

  try {
    await pool.query('START TRANSACTION')

    const result = await pool.query<ResultSetHeader>('UPDATE movies SET ? WHERE id = ?', [movieDetails, movieId])

    if (result[0].affectedRows === 0) {
      await pool.query('ROLLBACK')
      return res.status(404).json({ error: 'Movie not found' })
    }
    await updateActorsMoviesRelations(movieId, actors)
    await pool.query('COMMIT')

    return res.json({ message: 'Movie successfully updated' })
  } catch (error) {
    await pool.query('ROLLBACK')
    console.error('Error updating movie:', error)
    return res.status(500).json({ error: 'Error updating movie' })
  }
}

export const deleteMovie = async (req: any, res: Response): Promise<any> => {
  const movieId: number = parseInt(req.params.id)

  try {
    await pool.query('START TRANSACTION')

    await pool.query('DELETE FROM actorsmovies WHERE movie_id = ?', [movieId])

    const result = await pool.query<ResultSetHeader>('DELETE FROM movies WHERE id = ?', [movieId])

    if (result[0].affectedRows > 0) {
      await pool.query('COMMIT')
      return res.json({ message: 'Movie and its relationships successfully deleted' })
    } else {
      await pool.query('ROLLBACK')
      return res.status(404).json({ error: 'Movie not found' })
    }
  } catch (error) {
    await pool.query('ROLLBACK')
    console.error('Error deleting movie:', error)
    return res.status(500).json({ error: 'Error deleting movie and its relationships' })
  }
}
