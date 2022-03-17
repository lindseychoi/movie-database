const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '0214',
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

app.get('/api/movies', (req, res) => {
    //res.send("test response");
    db.query('SELECT movie_name FROM movies', function (err, results) {
        res.send(results);
    });
});

app.post('/api/movies', (req, res) => {
    db.query('INSERT INTO movies (movie_name) VALUES (?)', req.body.movie_name, (err, results) => {
        if (err) {
            console.log(err);
          }
          res.send(results);
    });
})


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);