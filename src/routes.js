//Requisição das biblitecas e das tabelas
const router = require('express').Router();
const ToDo = require('./models/ToDo');
const Autor = require('./models/ToDo')

//Configuração de rotas
    //Menu
    router.route('/menu')
        .get((req, res) => {
            Autor.find({})
                .then (response => res.render('menu', { data: response }))
        })

        .post((req, res) =>{
            const { autor } = req.body;
            const NewAutor = new Autor({
                autor : autor
            })
            NewAutor.save()
            res.redirect('/menu')
        })
    
    //Página principal
    router.route('/home/:id')
        .get((req, res) => {
            ToDo.find({ todo: req.params.autor })
                .then( response => res.render('home', { data: response}))
                .catch ( err => res.render('error', { error: err }))
        })
        .post((req, res) =>{
            const { atividade } = req.body;
            const { duracao } = req.body;
            const { horario } = req.body;
            const { descricao } = req.body;
            const NewToDo = new ToDo({
                atividade : atividade,
                duracao: duracao,
                horario: horario,
                descricao: descricao
            });
            NewToDo.save();
            res.redirect('/');
        })

        .delete((req, res) => {
            ToDo.findByIdAndDelete( req.params.id )
                .then (response => console.log('deletado', { data: response }))
                .err ( err => res.render('error', { error: err }))
                
            res.redirect('/')
        })
    
    //Página de item
    router.route('/:id')
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