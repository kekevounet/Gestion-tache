
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_de_tache',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('✅ Connecté à la base de données.');
  }
});

// Récupération de toutes les tâches
app.get('/tache', (req, res) => {
  db.query('SELECT * FROM tache', (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la récupération des tâches.');
    }
    res.json(result);
  });
});

// Récupération d'une tâche par ID
app.get('/tache/modifier/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tache WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la récupération de la tâche.');
    }
    res.json(result);
  });
});

// Mise à jour d'une tâche
app.put('/tache/:id', (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;
  db.query(
    'UPDATE tache SET nom = ?, description = ? WHERE id = ?',
    [nom, description, id],
    (err, result) => {
      if (err) {
        return res.status(500).send('Erreur lors de la mise à jour de la tâche.');
      }
      res.json(result);
    }
  );
});

// Suppression d'une tâche
app.delete('/tache/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tache WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la suppression de la tâche.');
    }
    res.json({ message: 'Tâche supprimée avec succès.' });
  });
});

// Création d'une tâche
app.post('/tache', (req, res) => {
  const { nom, description } = req.body;
  const date = new Date();
  const status = 0;

  db.query(
    'INSERT INTO tache (nom, description, date, status) VALUES (?, ?, ?, ?)',
    [nom, description, date, status],
    (err, result) => {
      if (err) {
        return res.status(500).send("Erreur lors de l'ajout de la tâche.");
      }
      res.status(201).json({ message: 'Tâche ajoutée avec succès.' });
    }
  );
});

// Modifier une status des taches
app.put('/tache/status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.query('UPDATE tache SET status = ? WHERE id = ?', [status, id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de la mise à jour du statut');
        } else {
            res.json({ message: 'Statut mis à jour avec succès' });
        }
    });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
