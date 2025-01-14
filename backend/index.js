require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { closePool } = require('./repositories')
const qrControllers = require('./controllers/qr');
const quizControllers = require('./controllers/quiz');
const questControllers = require('./controllers/quest');
const userControllers = require('./controllers/user');

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());

const port = process.env.PORT || 8989;

app.get('/api/health', (req, res) => {
  res.send('Test, samuel!');
});

/**
 * QR api
 */

app.get('/api/qr/generate', async (req, res) => {
  qrControllers.generate(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/qr/scan', async (req, res) => {
  qrControllers.scan(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

/**
 * Quiz api
 */

app.get('/api/quiz/questions', async (req, res) => {
  quizControllers.getQuestions(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/quiz/answers', async (req, res) => {
  quizControllers.submitAnswers(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/quiz/result', async (req, res) => {
  quizControllers.getPersonalityResult(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

/**
 * Quest api
 */

app.get('/api/quests', async (req, res) => {
  questControllers.getAllQuests()
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/quests', async (req, res) => {
  questControllers.addQuest(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.put('/api/quests/:quest_id/mindfile', async (req, res) => {
  questControllers.updateQuestMindFile(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.get('/api/quests/:quest_id/mindfile', async (req, res) => {
  questControllers.getQuestMindFile(req)
    .then(resp => res.send(resp))
    .catch(err => res.status(500).json(err))
})

/**
 * User api
 */

app.get('/api/users', async (req, res) => {
  userControllers.getUserLeaderboard()
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/users', async (req, res) => {
  userControllers.addNewUser(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.get('/api/users/:user_id/xp', async (req, res) => {
  userControllers.getUserQuestXp(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/users/:user_id/quests/:quest_id/done', async (req, res) => {
  userControllers.completeUserQuest(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});

process.on('SIGTERM', () => {
  closePool();
  process.exit(0);
})

process.on('SIGINT', () => {
  closePool();
  process.exit(0);
})