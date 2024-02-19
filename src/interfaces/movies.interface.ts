export interface Movie {
  id: number
  title: string
  sinopsis: string
  director_id: number
  genero_id: number
  cover: string
  year: number
  was_watched: boolean
  rating: number
  actors: entities[]
}

export interface entities { id: number, name: string }

export type MovieBody = Omit<Movie, 'actors'> & { actors: number[] }
