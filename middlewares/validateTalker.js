const fs = require('fs');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name === '' || !name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (age === '' || !age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

/** Ref: https://www.regextester.com/99555 */

const validateDateAndTalk = (req, res, next) => {
  const { talk } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  
  if (!date.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (Number(talk.rate) > 1 || Number(talk.rate) < 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const createTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const id = talkers.length + 1;

  const newTalker = { name, age, talk, id };
  talkers.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify([newTalker]));
  return res.status(201).json(newTalker);
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateDateAndTalk,
  validateRate,
  createTalker,
};