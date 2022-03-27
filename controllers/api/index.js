const router = require('express').Router();

// importing user, post and comment routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');




//redirecting traffic to the designation endpoint
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);





module.exports = router;
