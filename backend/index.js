require('dotenv').config();

const express = require('express');
const cors = require('cors');

const qrControllers = require('./controllers/qr');
const quizControllers = require('./controllers/quiz');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8989;

app.get('/api/health', (req, res) => {
  res.send('Test, samuel!');
});

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


app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
