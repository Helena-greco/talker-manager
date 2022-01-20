const fs = require('fs');

const HTTP_OK_STATUS = 200;

const talker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  if (talkers.length === 0) {
    res.status(HTTP_OK_STATUS).json([]);
  }

  res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = talker;