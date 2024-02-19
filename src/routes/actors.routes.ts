import express from 'express'
import * as actorsController from '../controllers/actors.controller'

const router = express.Router()

router.get('/', (req, res) => {
  actorsController.getActors(req, res)
    .then((data) => {
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error getting actors' })
    })
})

router.post('/', (req, res) => {
  actorsController.addActors(req, res)
    .then((newActor) => {
      return newActor
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error creating actor' })
    })
})

router.patch('/:id', (req, res) => {
  actorsController.updateActor(req, res)
    .then((newActor) => {
      return newActor
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error editing actor' })
    })
})

export default router
