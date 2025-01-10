
import express, { Request, Response} from 'express'
const app = express();
const port = 4000;
const fs = require('node:fs');
const cors = require('cors');

app.use(cors());
app.use(express.json());  

const findAllMovies = () => {
  const data = fs.readFileSync('data/movies.json', 'utf8');
  return JSON.parse(data);
};

app.get("/movies", (req, res) => {
  const movies = findAllMovies();
  res.json(movies);
});

const findById = (req: Request, res: Response) => {
  const movieId = req.params.id;
  const movies = findAllMovies();
  const movie = movies.find((movie: any) => movie.id === Number(movieId));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
};

app.get('/movies/:id', findById);

app.delete('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const movies = findAllMovies();
  const updatedMovies = movies.filter((e: any) => e.id !== Number(movieId));

  const moviesString = JSON.stringify(updatedMovies, null, 4);
  fs.writeFileSync('data/movies.json', moviesString);

  res.json({
    message: 'Movie deleted'
  });
});

app.patch('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const { name } = req.body;  
  const movies = findAllMovies();

  const movieIndex = movies.findIndex((movie: any) => movie.id === Number(movieId));

  movies[movieIndex] = { ...movies[movieIndex], name };

  const moviesString = JSON.stringify(movies, null, 4);
  fs.writeFileSync('data/movies.json', moviesString);

  res.status(200).json({
    message: 'Movie updated'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
