import pool from '../database'
import { Response } from 'express'
import { ResultSetHeader } from 'mysql2'

export const getCategories = async (_req: any, res: Response): Promise<void> => {
  try {
    const [result] = await pool.query('SELECT * FROM categories')
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'not conection with database' })
  }
}

export const addCategory = async (req: any, res: Response): Promise<any> => {
  const name: string = req.body.name !== undefined ? req.body.name.toString() : ''

  if (name.trim() === '') {
    return res.status(400).json({ error: 'The name of the category is required' })
  }

  try {
    await pool.query('INSERT INTO categories (name) VALUES (?)', [name])
    return res.json({ message: 'Category successfully updated' })
  } catch (error) {
    return res.status(500).json({ error: 'not conection with database' })
  }
}

export const updateCategory = async (req: any, res: Response): Promise<any> => {
  const name: string = req.body.name !== undefined ? req.body.name.toString() : ''
  const categoryId: number = parseInt(req.params.id)
  console.log({ name, categoryId })
  if (name.trim() === '') {
    return res.status(400).json({ error: 'The name of the category is required' })
  }
  try {
    const [result] = await pool.query<ResultSetHeader>('UPDATE categories SET name = ? WHERE id = ?', [name, categoryId])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'The category does not exist' })
    }
    return res.json({ message: 'Category successfully updated' })
  } catch (error) {
    return res.status(500).json({ error: 'Error updating category' })
  }
}

// to do: delete entity when no relationships exist
