const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema(
    {
        UserName: { type: String },
        TodoSubject: { type: String },
        TodoDescription: { type: String },
        TodoStatus: { type: String },
        TodoCreateDate: { type: Date },
        TodoUpdateDate: { type: Date },
    },
    { versionKey: false }
);

const TodoModel = mongoose.model('todolist', TodoSchema);

module.exports = TodoModel;
