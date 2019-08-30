//Requisição das biblitecas
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const expresLayouts = require('express-ejs-layouts');
const server = express();

//Configuração das Bibliotecas
    //Conexão com o banco de dados
    mongoose.connect('mongodb://localhost:27017/ToDo', { useNewUrlParser: true })
        .then( response => console.log('Banco Conectado!'))
        .catch ( err => console.log(err));

    //Middleware express
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    //Morgan e Cors
    server.use(morgan('dev'));
    server.use(cors());

    //EJS
    server.set('view engine', 'ejs');
    server.set('views', 'src/views');
    server.use(expresLayouts);

//Configuração de rotas
server.use(require('./routes'))
server.listen(8000);
