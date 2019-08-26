//Requisição das biblitecas e das tabelas
const routes = require('express').Router();
const ToDo = require('./models/Todo');

//Configuração de rotas
    //Página principal
    router.route('/')
        .get((req, res) => {
            res.render('home')
        })