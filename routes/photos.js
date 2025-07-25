const express = require('express');
const router = express.Router();
const axios = require('axios');

// Render form to add a photo
router.get('/add', function (req, res, next) {
    res.render('fotos_formulario', { title: 'Agregar Foto' });
});

// Save photo (POST)
router.post('/save', async function (req, res, next) {
    let { title, description, rate } = req.body;
    const URL = 'http://localhost:3000/rest/fotos/save';
    let data = {
        titulo: title,
        descripcion: description,
        calificacion: rate,
        ruta: ''
    };
    try {
        const response = await axios.post(URL, data);
        if (response.status === 200 && response.statusText === 'OK') {
            res.redirect('/photos');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Optional: List photos (GET /photos)
router.get('/', (req, res) => {
    // You can fetch and render a list of photos here, or just render a placeholder
    res.render('fotos_formulario_add', { title: 'Lista de Fotos' });
});

module.exports = router;
