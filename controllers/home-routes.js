const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req,res) => {
    Post.findAll({
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
        // passing single post object into homepage.handlebars
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn:req.session.loggedIn, username: req.session.username });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

router.get('/login', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/post/:id', (req,res) => {
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
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });            
            return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });        

        //pass the data into the view
        res.render('single-post.handlebars', { post, loggedIn: req.session.loggedIn, username: req.session.username });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;