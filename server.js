let express = require('express'),
    app 		= express();
//var http = require(http).Server(app);
//let path = require ('path');
//let compression = require('compression');
//var bodyParser = require('body-parser');
//var db = require('./server/database/database');
//var jwt = require('jsonwebtoken')

app.use(express.static('/viniepodo-frontend'));
app.get('*',function(req,res){
        res.sendFile(__dirname + '/index.html');
}).listen(9000,function(){
    console.log('PUERTO ACTIVO');
})



/*

let serve = express();
let app = express();
let gzipStatic = require('connect-gzip-static');
//let fs = require('fs');
//fs.readFileAsync('somefile').then(console.log);
//let cors = require('cors');
let dir = './dist';
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let port = config.port;
let appName = config.subDomain;

/*if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}*/




/* Begin Fake auth
serve.use(cors());
serve.post('/auth', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data-auth.example.json', 'utf8'));
    res.send(data);
});

serve.get('/test', (req, res) => {
    res.send({
        count: 2,
        results: [{ name: 'christian', age: 21 }, { name: 'anthony', age: 88 }],
        page: 1
    });
});
/ End Fake auth

*/