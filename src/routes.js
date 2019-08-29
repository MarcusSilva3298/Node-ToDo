//Requisição das biblitecas e das tabelas
const router = require('express').Router();
const ToDo = require('./models/ToDo');

//Configuração de rotas
    //Página principal
    router.route('/')
        .get((req, res) => {
            ToDo.find({ todo: req.params.horario })
                .then( response => res.render('home', { data: response}))
                .catch( err => console.log(err));
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
                .catch (err => console.log(err))
                
            res.redirect('/')
        })
    
    //Página de item
    router.route('/:id')
        .get((req, res) => {
            ToDo.findOne({ _id: req.params.id })
                .then ( response => res.render('item', { data: response }))
                .catch ( err => console.log( err ))

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