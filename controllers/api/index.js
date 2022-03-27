const router = require('express').Router();

// importing user, post and comment routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');




//redirecting traffic to the designation endpoint
router.use('/users', userRoutes);
router.use('/posts', postRoutes);






module.exports = router;
