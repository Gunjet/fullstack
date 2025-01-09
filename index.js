const express = require('express')
const app = express();
const port = 4000;
const fs =require("node:fs")
const cors = require('cors')

app.use(cors())

app.get("/movies", (req, res) => {
    const data = fs.readFileSync("data/movies.json", "utf8");
        const movies = JSON.parse(data);
        res.json(movies)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get("/movies", (req, res) => {
    const data = fs.readFileSync("data/movies.json", "utf8");
    const movies = JSON.parse(data);
    res.json(movies);
})

app.get("/movies/create", (req, res) => {
    const { name } = req.query
    const data = fs.readFileSync("data/movies.json", "utf8");
    const movies = JSON.parse(data);

    movies.push({ 
        id: Date.now()
        // name,
    });

    const moviesString = JSON.stringify(movies, null, 4);
    fs.writeFileSync('data/movies.json', content);

    res.send({ message: "Success" })
});

app.get("/movies/update", (req, res) => {});

// app.post('/movies/create', create);
 const findById = (req, res) => {
    const movieId = req.params.id;
    const movies = findAllMovies();
    const movie = movies.find((movie) => movie.id === Number(movieId));

    res.json(movie)
 };

 app.get('/movies/:id', findById)

app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id
    const movies = findAllMovies();

    const updatedMovies = movies.filter((e) => e.id !== Number(movieId));

    const moviesString = JSON.stringify(updatedMovies, null, 4);
    fs.writeFileSync('data/movies.json', moviesString);

    res.json({
        message: 'Deleted'
    })
})