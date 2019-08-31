const { Schema, model } = require('mongoose')

const ToDoSchema = new Schema({
    atividade: {
        type: String,
        required: true
    },
    duracao: {
        type: String,
        default: ' '
    },
    horario: {
        type: String,
        default: ' '
    },
    descricao: {
        type: String,
        default: ' '
    },
    /*
    autor: {
        type: String,
        required: true
    }
    */
})

module.exports = model('ToDo', ToDoSchema)