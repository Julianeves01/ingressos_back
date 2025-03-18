const express = require('express');
const router = express.Router();
const ingressosController = require('../controllers/ingressoController');

router.get('/', ingressosController.getAllIngressos);
router.post('/', ingressosController.createIngresso);
router.get('/:id', ingressosController.getIngressoById);
router.put('/:id', ingressosController.updateIngresso);
router.delete('/:id', ingressosController.deleteIngresso);

module.exports = router;