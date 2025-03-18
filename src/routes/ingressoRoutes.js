const express = require('express');
const router = express.Router();
const ingressoController = require('../controllers/ingressoController');

router.get('/ingressos', ingressoController.getAllIngresso);
router.post('/ingressos', ingressoController.createIngresso);
router.get('/ingressos/:id', ingressoController.getIngresso);
router.put('/ingressos/:id', ingressoController.updateIngresso);
router.delete('/ingressos/:id', ingressoController.deleteIngresso);
router.post('/ingressos/:id/venda', ingressoController.vendaIngresso);

module.exports = router;
