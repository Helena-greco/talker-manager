const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./middlewares/talker');
const login = require('./middlewares/login');
const { 
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk,
  validateDate, 
  validateRate, createTalker } = require('./middlewares/validateTalker');
const { talkersId, deleteById } = require('./middlewares/talkerId');
const editTalker = require('./middlewares/editTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Req 1
app.get('/talker', talker);

// Req 2, exemplo da aula do course
app.get('/talker/:id', talkersId);

// Req 3
app.post('/login', login);

// Req 4
app.post('/talker', validateToken, validateName, validateAge,
  validateTalk, validateDate, validateRate, createTalker);

// Req 5
app.put('/talker/:id', validateToken, validateName, validateAge,
validateTalk, validateDate, validateRate, editTalker);

// Req 6
app.delete('/talker/:id', validateToken, deleteById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
