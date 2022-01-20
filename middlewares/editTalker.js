const fs = require('fs');

const editTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  
  const newTalker = { ...talkerId, name, age, talk };

  talkers.push(newTalker);
  
  fs.writeFileSync('./talker.json', JSON.stringify([newTalker]));
  return res.status(200).send(newTalker);
};

module.exports = editTalker;