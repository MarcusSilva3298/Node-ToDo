const { Schema, model } = require('mongoose')

const ToDoSchema = new Schema({
    atividade: {
        type: String,
        default: 'criar todo',
        required: true
    },
    duracao: {
        type: String,
        default: '5 minutos',
        required: true
    },
    horario: {
        type: String,
        default: '2019-01-01T00:00',
        required: true
    },
    descricao: {
        type: String,
    },
    autor: {
        type: String,
        required: true
    }
})

module.exports = model('ToDo', ToDoSchema)