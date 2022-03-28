const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// Create withAuth and export it here

// GET /api/users/
router.get('/', (req,res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then(dbUserData => {
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req,res) => {
    User.findOne({
        where:  {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'post_title', 'post_content', 'created_at', 'updated_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['post_title']
                }
            }
        ]
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create user -> POST /api/users
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Login --> /api/users/login
router.post('/login', (req,res) => {
    // expects email: <>, password: <>
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'Your email or password is wrong'});
            return;
        }

        const validPassword = dbUserData.checkPassword(dbUserData.password);

        if(!validPassword) {
            res.status(404).json({ message: 'Your email or password is wrong'});
            return;
        }

        res.session.save(() => {
            req.session.user_id = dbUserData.user_id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ 
                user: dbUserData,
                message: 'You are now logged in!'
            });
        });
    });
});

// Logout --> /api/users/logout
router.post('/logout', (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// (Update a user) PUT --> /api/users/2
router.put('/:id', (req,res) => {
    // expects {username: <>, email: <>, password: <>}
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// (Delete user) DELETE --> /api/users/2
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {id: req.params.id}
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})




module.exports = router;