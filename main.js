const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const directorModel = require('./models/Director');

const app = express();

mongoose.connect('mongodb://localhost:27017/jehoton',
{
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(e => {
    console.log(e);
});

app.use(express.json());
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

let Director = [];
let Directorprofile = [];

app.get('/', async (req, res) => {
    try {
        const directorInstance = await directorModel.find({}, {"_id":0, "directorName":1});
        console.log('부장 목록 : ' + directorInstance);
        Director = directorInstance.map(i => i.directorName).slice()
        console.log(Director, typeof Director);
    } catch(err) {
        console.log('에러');
    }
    res.render('index', { Director });
});

app.post('/', async (req, res) => {
    const { contents } = req.body;

    await checkDirector(contents);
    console.log(Directorprofile);
    res.render('index', { Director, Directorprofile });
    //데이터 프론트로 넘기기
});

app.get('/addDirector', (req, res) => {
    res.render('addDirector');
});

//부장 추가
app.post('/addDirector', async (req, res) => {
    const { directorName, directorInf } = req.body;
    
    try { 
        await directorModel.create({
            directorName, directorInf
        });
        Director.push(directorName);
        return res.status(200).json(directorModel);
    } catch(err) {
        return res.status(500).json({ error: err });
    }
});

//부장 목록 검색
app.get('/selectDirector', async (req, res) => {
    try {
        const directorInstance = await directorModel.find();
        console.log('부장 목록 : ' + directorInstance);
        return res.status(200).json(directorInstance);
    } catch(err) {
        console.log('에러');
        return res.status(500).json({error:err});
    }
});

//주의 데이터삭제-----------------------------------------------------------
app.get('/deleteDirector', async (req, res) => {
    try {
        const deleteData = await directorModel.deleteMany();
        console.log('초기화');
        res.send(`<script>window.location.href = "/"</script>`);
    } catch(err) {
        console.log('에러');
        return res.status(500).json({error:err});
    }
})

//페이지 접근제한
app.get('*', (req, res) => {
    res.send(`<script>history.back()</script>`);
});

app.listen(8080, () => {
    console.log('server start');
});

async function checkDirector(contents) {
    if(Director.find(e=>e===contents)) {
        console.log(contents)
        const directorInstance = await directorModel.find({directorName: contents}, {"_id":0, "directorInf":1});
        Directorprofile = directorInstance.map(i => i.directorInf).slice();
        console.log(contents, Directorprofile);
    };
}
