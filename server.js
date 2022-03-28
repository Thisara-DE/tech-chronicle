const path = require ('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
//express handlebars
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

//enabling session and session store
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SESSION_KEY,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//express handlebar middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//session middleware
app.use(session(sess));

//Turn on routes
app.use(routes);


//Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


//server setup --done
//Modules (tables)
    //create db/schema -- done
    //create below modules in the modules folder --done
        //posts (id, post_title, post content, user_id, created_at, updated_at)
        //comments (id, comment_text, post_id, user_id, created_at, updated_at)
        //user (id, username, email, password)
//routes (controller) 
    // api routes -- done
        //posts
            // get all posts
            // get 1 post
            // create a post (POST)
            // update a post (PUT)
            // delete a post (DELETE)
        //user
            // get all users
            // get 1 user
            // create a user (POST)
            // login
            // logout
            // update a user (PUT)
            // delete a user (DELETE)
        //comments            
            // get all comment
            // create a comment
            // delete a comment
    // front end routes
        // home-routes
            // get all posts for the homepage (GET) (/)
            // load login/signup page (/login)
            // get 1 post when clicked on the title (GET)('/post/:id')
        // dashboard-routes
            // get all posts for a user (GET) (dashboard/)
            // find one post (to edit the title or the post content) ('dashboard/edit/:id)
//Views
    //layouts
        //main.handlebars
    // homepage.handlebars
    // login.handlebars
    // single-post.handlebars
    // dashboard.handlebars
    // edit-post.handlebars


