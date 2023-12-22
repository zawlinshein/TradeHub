const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); 

// create an array to store articles
let articles = [
    { id: 1, title: 'Article 1', content: 'Content 1' },
    { id: 2, title: 'Article 2', content: 'Content 2' },
    { id: 3, title: 'Article 3', content: 'Content 3' }
];
let users = [

]
// create an endpoint to get all articles
app.get('/articles', (req, res) => {
    res.json(articles);
});

app.get('/users', (req, res) => {
    res.json(users);
});

// create an endpoint to get all articles
app.get('/articles', (req, res) => {
    res.json(articles);
});
// create an endpoint to get an article by id
app.get('/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article not found');
    res.json(article);
});
// create an endpoint to create an article
app.post('/articles', (req, res) => {
    const article = {
        ...req.body
    };
    articles.push(article);
    res.json(article);
});

app.post('/users', (req, res) => {
    const article = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    users.push(article);
    res.json(article);
});

// create an endpoint to update an article
app.put('/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article not found');
    article.title = req.body.title;
    article.content = req.body.content;
    res.json(article);
});
// create an endpoint to delete an article
app.delete('/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article not found');
    const index = articles.indexOf(article);
    articles.splice(index, 1);
    res.json(article);
});
app.listen(port, () => console.log(`Newspaper API listening at http://localhost:${port}`));