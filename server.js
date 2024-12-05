// Importăm modulele necesare
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

// Creăm aplicația Express
const app = express();

// Configurăm middleware
app.use(bodyParser.json()); // Pentru a putea procesa cereri JSON
app.use(cors()); // Permite cereri de la frontend (pentru a evita probleme cu CORS)

// Setăm portul pe care va asculta serverul
const PORT = process.env.PORT || 5000;

// Rutele pentru gestionarea feedback-ului

// Ruta GET pentru a prelua feedback-ul din fișierul JSON
app.get('/api/feedback', (req, res) => {
    fs.readFile('feedback.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Eroare la citirea datelor de feedback');
        }
        res.json(JSON.parse(data)); // Răspundem cu feedback-ul în format JSON
    });
});

// Ruta POST pentru a adăuga un feedback
app.post('/api/feedback', (req, res) => {
    const { user, message } = req.body; // Extragem datele din cerere

    if (!user || !message) {
        return res.status(400).send('User și mesajul sunt necesare'); // Verificăm dacă datele sunt completate
    }

    // Citim fișierul JSON pentru a adăuga feedback-ul
    fs.readFile('feedback.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Eroare la citirea datelor de feedback');
        }

        const feedback = JSON.parse(data); // Parsăm feedback-ul existent
        feedback.push({ user, message }); // Adăugăm feedback-ul nou

        // Scriem feedback-ul actualizat în fișier
        fs.writeFile('feedback.json', JSON.stringify(feedback, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Eroare la salvarea datelor de feedback');
            }
            res.status(201).send('Feedback-ul a fost adăugat cu succes');
        });
    });
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});