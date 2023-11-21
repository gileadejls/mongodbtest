require('dotenv').config()

// DEPENDENCIAS
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//IMPORTANDO MODEL
const Login = require('./src/models/loginModel')

mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    console.log("Conectado ao bando de dados MONGODB")
    app.emit('ready')
})


app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//ROTA CSS
app.use(express.static(path.join(__dirname, 'public')));

//ROTAS ---------------------------------------------------------------------

//HOME
app.get('/', (req, res)=>{
    res.render('index.ejs')
})

//LOGIN
app.get('/login', (req, res)=>{
    res.render('login')
})

//HABILITANDO O JSON
app.use(bodyParser.urlencoded({extended: true}))

//LOGIN POST
app.post('/login', async (req, res)=>{
    const loginRequest = new Login(req.body)
    const result = await loginRequest.logar()
    if(!result){
        console.log(`Usuario Invalido ${loginRequest.errors}`)
        return
    }

    console.log(`Login Efetuado com Sucesso! USUARIO: ${loginRequest.user}`)
    res.render('index')
})

//INICIANDO SERVIDOR
app.on('ready', ()=>{
    app.listen(3000, ()=>{
        console.log('Servidor rodando')
    })
})