//Requisição das biblitecas e das tabelas
const router = require('express').Router();
const ToDo = require('./models/ToDo');

//Configuração de rotas
    //Página principal
    router.route('/')
        .get((req, res) => {
            ToDo.find()
                .then( response => res.render('home', { data: response}))
                .catch( err => console.log(err));
        })
        .post((req, res) =>{
            const { atividade } = req.body;
            const { duracao } = req.body;
            const { horario } = req.body;
            const NewToDo = new ToDo({
                atividade : atividade,
                duracao: duracao,
                horario: horario
            });
            NewToDo.save();
            res.redirect('/');
        })

    router.route('/:id')
        .get((req, res) => {
            ToDo.findOne({ _id: req.params.id })
                .then ( response => res.render('', { data: response }))
                .catch ( err => console.log( err ))
        })

module.exports = router