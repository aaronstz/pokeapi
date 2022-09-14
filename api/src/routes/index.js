const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routePokes = require('./pokesRoutes')
const routeTypes = require('./typesRoutes')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', routePokes)
router.use('/types', routeTypes)

module.exports = router;
