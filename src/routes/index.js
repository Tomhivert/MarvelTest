const { Router } = require('express');
const marvelRoutes = require('./marvelRoutes');

const router = Router();

// Marvel assignment routes
router.use('/', marvelRoutes);

module.exports = router;
