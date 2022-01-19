const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const login = require('./middlewares/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  
  if (talkers.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }

  res.status(HTTP_OK_STATUS).json(talkers);
});

// Exemplo da aula do course

app.get('/talker/:id', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  
  res.status(200).send(talkerId);
});

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
