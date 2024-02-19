import express from 'express'
import * as movieServices from '../controllers/movies.controller'

const router = express.Router()

router.get('/', (req, res) => {
  movieServices.getMovies(req, res)
    .then((data) => {
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error al obtener las películas' })
    })
})

router.post('/', (req, res) => {
  movieServices.addMovie(req, res)
    .then((data) => {
      return data
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error al obtener las películas' })
    })
})

router.patch('/:id', (req, res) => {
  movieServices.updateMovie(req, res)
    .then((newMovie) => {
      return newMovie
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error editing movie' })
    })
})

router.delete('/:id', (req, res) => {
  movieServices.deleteMovie(req, res)
    .then((newMovie) => {
      return newMovie
    })
    .catch(error => {
      console.error('Error:', error)
      res.status(500).json({ error: 'Error editing movie' })
    })
})

export default router
