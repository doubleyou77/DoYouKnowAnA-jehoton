const express = require('express');
const app = express();
app.use(express.json());

app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

const Director = ['조재호', '안용호', '오연호', '심영수', '이혜찬', '민경록', '김형진'];

app.get('/', (req, res) => {
    res.render('index', {Director});
});

app.post('/', async (req, res) => {
    const { contents } = req.body;

    await checkDirector(contents);
});

app.get('*', (req, res) => {
    res.send(`<script>history.back()</script>`);
});

app.listen(8080, () => {
    console.log('server start');
});

function checkDirector(contents) {
    switch(contents) {
        case '조재호' : console.log('조재호'); break;
        case '안용호' : console.log('안용호'); break;
        case '오연호' : console.log('오현호'); break;
        case '심영수' : console.log('오연호'); break;
        case '이혜찬' : console.log('이혜찬'); break;
        case '민경록' : console.log('민경록'); break;
        case '김형진' : console.log('김형진'); break;
    }
}