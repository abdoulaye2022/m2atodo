const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const PriorityRoutes = require('./routes/PriorityRoutes');
const TaskRoutes = require('./routes/TaskRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Définir un middleware pour gérer les requêtes GET sur la racine de l'application
app.get('/api/v1', (req, res) => {
    res.send('Hello World!');
});
// Utilisation des routes des utilisateurs
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/priorities', PriorityRoutes);
app.use('/api/v1/tasks', TaskRoutes);

// Démarrer le serveur et écouter les connexions sur un port spécifique (par exemple, 3000)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Serveur Express démarré sur le port ${PORT}`);
});
