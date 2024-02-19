import express from 'express'
import * as categoriesServices from '../controllers/categories.controller'

const router = express.Router()

router.get('/', (req, res) => {
  categoriesServices.getCategories(req, res)
    .then((data) => {
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error getting category' })
    })
})

router.post('/', (req, res) => {
  categoriesServices.addCategory(req, res)
    .then((newCategory) => {
      return newCategory
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error creating category' })
    })
})

router.patch('/:id', (req, res) => {
  categoriesServices.updateCategory(req, res)
    .then((newCategory) => {
      return newCategory
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error editing category' })
    })
})

export default router
