const router = require('express').Router();

// importing user, post and comment routes
const userRoutes = require('./user-routes');




//redirecting traffic to the designation endpoint
router.use('/users', userRoutes);






module.exports = router;
