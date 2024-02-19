import express from 'express'
import moviesRoutes from './routes/movies.routes'
import categoriesRoutes from './routes/categories.routes'
import directorRoutes from './routes/directors.routes'
import actorRoutes from './routes/actors.routes'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Initialization

dotenv.config()
const app = express()

// Settings
app.set('port', process.env.PORT ?? 5050)

// Middlewares
app.use(morgan('dev')) // para ver las peticiones
app.use(express.json())

app.get('/', (_, res) => {
  res.json({ message: 'API peliculas' })
})

app.use('/api/movies', moviesRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/directors', directorRoutes)
app.use('/api/actors', actorRoutes)

app.listen(app.get('port'), () => {
  console.log('app runining in port ', app.get('port'))
})
