import pool from '../database'
import { Response } from 'express'
import { ResultSetHeader } from 'mysql2'

export const getDirectors = async (_req: any, res: Response): Promise<void> => {
  try {
    const [result] = await pool.query('SELECT * FROM directors')
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'not conection with database' })
  }
}

export const addDirector = async (req: any, res: Response): Promise<any> => {
  const name: string = req.body.name !== undefined ? req.body.name.toString() : ''

  if (name.trim() === '') {
    return res.status(400).json({ error: 'The name of the director is required' })
  }

  try {
    await pool.query('INSERT INTO directors (name) VALUES (?)', [name])
    return res.json({ message: 'Director successfully created' })
  } catch (error) {
    return res.status(500).json({ error: 'Not conection with database' })
  }
}

export const updateDirector = async (req: any, res: Response): Promise<any> => {
  const name: string = req.body.name !== undefined ? req.body.name.toString() : ''
  const directorId: number = parseInt(req.params.id)

  if (name.trim() === '') {
    return res.status(400).json({ error: 'The name of the director is required' })
  }
  try {
    const [result] = await pool.query<ResultSetHeader>('UPDATE directors SET name = ? WHERE id = ?', [name, directorId])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'The director does not exist' })
    }
    return res.json({ message: 'Director successfully updated' })
  } catch (error) {
    return res.status(500).json({ error: 'Error updating director' })
  }
}

// to do: delete entity when no relationships exist
