const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// GET dashboard/
router.get('/', withAuth, (req,res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'post_title', 'post_content', 'created_at', 'updated_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    }).then(dbPostData => {
        //serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard.handlebars', { posts, loggedIn: true, username: req.session.username });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /dashboard/edit/2
router.get('/edit/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_title', 'post_content', 'created_at', 'updated_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    }).then(dbPostData => {
        //serialize the data before responding
        const post = dbPostData.get({ plain: true });
        res.render('edit-post.handlebars', {post, loggedIn: true, username: req.session.username})
    });
});











module.exports = router;