const express = require('express');

const cors = require('cors')

const app = express();

let notas = require('./notas.json');

app.use(express.json());

const logger = require('./logger')

app.use(cors())
app.use(logger)


app.get('/', (request, response) => {
  response.send('<h1>API WEB DE LORENZO LOPEZ</h1>');
});

app.get('/api/notas', (request, response) => {
  response.json(notas);
});

app.get('/api/notas/:id', (request, response) => {
  const id = Number(request.params.id);
  const singleNote = notas.find((note) => note.id === id);
  (singleNote) ? response.json(singleNote) : response.status(404).end();
});

app.delete('/api/notas/:id', (request, response) => {
  const id = Number(request.params.id);
  notas = notas.filter(note => note.id !== id);
  response.status(204).end()
})

app.post('/api/notas', (request, response) => {
  const note = request.body;
  console.log(request)
  const ids = notas.map((users) => users.id);
  const maxId = Math.max(...ids);

  let newNote = {
    "id": maxId + 1,
    "name": note.name,
    "registered": new Date().toISOString(),
  };
  const notesNew = Array.prototype.concat(...notas,newNote);

  response.status(201).json(notesNew);
});

app.use(( request, response ) => {
  response.status(404).json({ 
    error : 'not found'
  });
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


