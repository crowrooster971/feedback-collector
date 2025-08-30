const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/feedback', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// Route pour soumettre un feedback
app.post('/api/feedback', (req, res) => {
    const feedback = new Feedback(req.body);
    feedback.save().then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

// Route pour obtenir tous les feedbacks
app.get('/api/feedback', (req, res) => {
    Feedback.find().then(feedbacks => {
        res.status(200).json(feedbacks);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
