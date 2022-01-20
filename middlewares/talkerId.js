const fs = require('fs');

const talkersId = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
  return res.status(200).send(talkerId);
};

const deleteById = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  talkers.splice(talkerId, 1);

  fs.writeFileSync('./talker.json', JSON.stringify([talkers]));
  return res.status(204).json();
};

module.exports = { talkersId, deleteById };