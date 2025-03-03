import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hbs from 'hbs';


const app = express();

//Define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');



//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Node App',
        name: 'Rahul',
        port: 3000
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Rahul',
        title: 'About Page',
        message: 'This is about page...'
    });
});


//app.com/help
//app.com/about

// app.use(express.static(path.join(__dirname, '../public/about.html')));
// app.use(express.static(path.join(__dirname, '../public/help.html')));

app.get('/help', (req, res) => {
    res.send({
        name: 'Rahul',
        age: 30
    });
});

app.get('/user', (req, res) => {
    res.send([{
        name: 'Rahul',
        age: 30
    },
    {
        name: 'Sachin',
        age: 40
    },
    {
        name: 'Dhoni',
        age: 35
    }]);
});

app.get('/about', (req, res) => {
    res.send('<h3>About page is there to give you information about us...</h3>');
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    console.log(req.query);
    res.send({
        products: [{
            name: 'Mobile',
            price: 20000
        },
        {
            name: 'Laptop',
            price: 50000
        },
        {
            name: 'Tablet',
            price: 10000
        },
        {
            name: 'Watch',
            price: 5000
        }]
    });
});

app.get('/help/*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Rahul',
       errorMessage: 'Help article not found'
   });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rahul',
        errorMessage: 'Page not found'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});