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
            res.redirect(`/home/${req.body.user}`)
        })

    router.route('/home/:user')
        .get((req, res) => {
            const { user } = req.params;
            ToDo.find({ autor: user })
                .then( response => res.render('home', { data: response, user: req.params.user }))
                .catch ( err => res.render('error', { user: req.params.user, error: err }))
        })

        .post((req, res) =>{
            const { atividade, duracao, horario, descricao } = req.body;
            const { user } = req.params;
            const NewToDo = new ToDo({
                atividade : atividade,
                duracao: duracao,
                horario: horario,
                descricao: descricao,
                autor: user
            });
            NewToDo.save();
            res.redirect(`/home/${ user }`);
        });

    //Página de item
    router.route('/:id')
        .get((req, res) => {
            ToDo.findOne({ _id: req.params.id })
                .then ( response => res.render('item', { data: response, user: req.params.user }))
                .catch ( err => res.render('error', { error: err }))

        })

        .delete((req, res) => {
            ToDo.findByIdAndDelete( req.params.id )
                .then( response => console.log('Deletado'))
                .catch ( err => res.render('error', { error: err }))

            res.redirect(`/home/${ req.params.user }`);
        })

    //Página de edição de item
    router.route('/edit/:id')
        .get((req, res) => {
            ToDo.findOne({ _id: req.params.id })
                .then( response => res.render('edit', { data: response }))
                .catch ( err => res.render('error', { error: err }))
        })

        .post((req, res) => {
            ToDo.findByIdAndUpdate(req.params.id, {
                atividade: req.body.nova_atividade,
                horario: req.body.novo_horario,
                descricao: req.body.nova_descricao,
                duracao: req.body.nova_duracao
            })
                .then( response => console.log('Editado', { data: response }))
                .catch( err => res.render('error', { error: err }))

            res.redirect(`/${req.params.id}`);
        })
  

module.exports = router