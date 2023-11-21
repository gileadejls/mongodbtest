require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    console.log("Conectado ao bando de dados MONGODB")
    app.emit('ready')
})


app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

//ROTA CSS
app.use(express.static(path.join(__dirname, 'public')));

//ROTAS

//HOME
app.get('/', (req, res)=>{
    res.render('index.ejs')
})

//LOGIN
app.get('/login', (req, res)=>{
    res.render('login')
})

//INICIANDO SERVIDOR
app.on('ready', ()=>{
    app.listen(3000, ()=>{
        console.log('Servidor rodando')
    })
})