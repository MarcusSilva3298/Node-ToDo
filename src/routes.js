//Requisição das biblitecas e das tabelas
const router = require('express').Router();
const ToDo = require('./models/ToDo');

//Configuração de rotas
    //Menu
    router.route('/')
        .get((req, res) => {
            res.render('menu')
        })

        .post((req, res) =>{
            res.redirect('/home/:user')
            res.req('\${res.params.user}')
        })

    //Página principal
    router.route('/home/:user')
        .get((req, res) => {
            ToDo.find({ name: req.params.user })
                .then( response => res.render('home', { data: response}))
                .catch ( err => res.render('error', { error: err }))
        })

        .post((req, res) =>{
            const { atividade } = req.body;
            const { duracao } = req.body;
            const { horario } = req.body;
            const { descricao } = req.body;
            const { user } = req.params.user;
            const NewToDo = new ToDo({
                atividade : atividade,
                duracao: duracao,
                horario: horario,
                descricao: descricao,
                autor: user
            });
            NewToDo.save();
            res.redirect('/home/:user');
        })

        .delete((req, res) => {
            ToDo.findByIdAndDelete( req.params.id )
                .then (response => console.log('deletado', { data: response }))
                .err ( err => res.render('error', { error: err }))
                
            res.redirect('/')
        })
    
    //Página de item
    router.route('home/:id')
        .get((req, res) => {
            ToDo.findOne({ _id: req.params.id })
                .then ( response => res.render('item', { data: response }))
                .catch ( err => res.render('error', { error: err }))

        })

        .post((req, res) => {
            ToDo.findByIdAndUpdate(req.params.id, {
                atividade: req.body.nova_atividade,
                horario: req.body.novo_horario,
                descricao: req.body.nova_descricao,
                duracao: req.body.nova_duracao
            });
            res.redirect('/');
        })

        .delete((req, res) => {
            ToDo.findByIdAndDelete( req.params.id )
                .then( response => console.log('Deletado'))
                .catch( err => console.log(err))

            res.redirect('/')
        })
  

module.exports = router