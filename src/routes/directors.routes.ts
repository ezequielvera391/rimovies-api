import express from 'express'
import * as directorController from '../controllers/directors.controller'

const router = express.Router()

router.get('/', (req, res) => {
  directorController.getDirectors(req, res)
    .then((data) => {
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error getting directors' })
    })
})

router.post('/', (req, res) => {
  directorController.addDirector(req, res)
    .then((newDirector) => {
      return newDirector
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error creating director' })
    })
})

router.patch('/:id', (req, res) => {
  directorController.updateDirector(req, res)
    .then((newDirector) => {
      return newDirector
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error editing director' })
    })
})

export default router
