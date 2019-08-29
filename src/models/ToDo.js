const { Schema, model } = require('mongoose')


const AutorSchema = new Schema({
    autor: {
        type: String,
        required: true
    }
})

const ToDoSchema = new Schema({
    atividade: {
        type: String,
        required: true
    },
    duracao: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
})

module.exports = model('ToDo', ToDoSchema)
module.exports = model('Autor', AutorSchema)