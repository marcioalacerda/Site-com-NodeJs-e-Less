//estrutura basica do app express
const express = require('express');
const app = express();
const multer = require("multer"); //importando o multer
const path = require("path"); // importar um modulo nativo do node para pegar a extensão do arquivo
var favicon = require('serve-favicon');//importando o favicon

//configuração da biblioteca de exibição HTML
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');//nesse caso a nossa engine é a ejs



//--------------------------------------------------------------
//função para manipular o arquivo depois que fez o upload 
const storage = multer.diskStorage({
    //direcionar o arquivo para a pasta uploads
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    //mantenha o nome original o arquivo e acrescente data e hora
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})

// objeto que vai receber o arquivo
const upload = multer({storage});
//--------------------------------------------------------------



// rota principal (pagina less)
app.get('/', function(req,res){
    res.render('../views/less');//informando qual render será exibida
});

// rota para a pagina história
app.get('/historia', function(req,res){
    res.render('../views/historia');
});

// rota para a pagina exercício
app.get('/exercicio', function(req,res){
    res.render('../views/exercicio');
});

//rota para a pasta uploads
app.post("/upload", upload.single("file"), function(req, res){
    res.send("Arquivo recebido!");
});

//--------------------------------------------------------------

//iniciando o servidor
app.listen(3001, function(){
    console.log('Executando na porta 3001');// mensagem de callback
});