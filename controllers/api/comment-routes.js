const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// Create withAuth and export it here

// GET /api/comments/
router.get('/', (req,res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id']
    }).then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// Create comment -> POST /api/comments/
router.post('/', (req,res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            //get user id from the session
            user_id: req.session.user_id
        }).then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err),
            res.status(400).json(err);
        });
    }
});

// Delete comment --> DELETE /api/comments/2
router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with that id' });
            return;
        }
        res.json(dbCommentData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});










module.exports = router;