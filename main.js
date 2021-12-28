const express = require('express');
//const mongoose = require('mongoose');

const app = express();

//mongoose.connect('mongodb://dbdb:dbdb@localhost:27017/mydb');

app.use(express.json());
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const Director = ['조재호', '안용호', '오연호', '심영수', '이혜찬', '민경록', '김형진'];

app.get('/', (req, res) => {
    res.render('index', { Director });
});

app.post('/', async (req, res) => {
    const { contents } = req.body;

    await checkDirector(contents);
    res.send('success');
});

app.get('/addDirector', (req, res) => {
    res.render('addDirector');
});

app.post('/addDirector', (req, res) => {
    res.render('index', { Director });
});

app.get('*', (req, res) => {
    res.send(`<script>history.back()</script>`);
});

app.listen(8080, () => {
    console.log('server start');
});

function checkDirector(contents) {
    if(Director.find(e=>e===contents)) {
        console.log(contents);
    };
}