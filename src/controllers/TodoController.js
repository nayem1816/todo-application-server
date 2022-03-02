const TodoModel = require('../models/TodoModel');

exports.CreateTodo = (req, res) => {
    let UserName = req.headers['UserName'];
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let TodoStatus = 'New';
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    const postBody = {
        UserName: UserName,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreateDate: TodoCreateDate,
        TodoUpdateDate: TodoUpdateDate,
    };

    TodoModel.create(postBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.ReadTodo = (req, res) => {
    let UserName = req.headers['UserName'];

    TodoModel.find({ UserName: UserName }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.UpdateTodo = (req, res) => {
    let id = req.body['_id'];
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let TodoUpdateDate = Date.now();

    const PostUpdateBody = {
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoUpdateDate: TodoUpdateDate,
    };

    TodoModel.updateOne(
        { _id: id },
        { $set: PostUpdateBody },
        { upsert: true },
        (err, data) => {
            if (err) {
                res.status(400).json({ status: 'fail', data: err });
            } else {
                res.status(200).json({ status: 'success', data: data });
            }
        }
    );
};

exports.UpdateStatus = (req, res) => {
    let id = req.body['_id'];
    let TodoStatus = req.body['TodoStatus'];
    let TodoUpdateDate = req.body['TodoUpdateDate'];

    const PostUpdateStatus = {
        TodoStatus: TodoStatus,
        TodoUpdateDate: TodoUpdateDate,
    };

    TodoModel.updateOne(
        { _id: id },
        { $set: PostUpdateStatus },
        { upsert: true },
        (err, data) => {
            if (err) {
                res.status(400).json({ status: 'fail', data: err });
            } else {
                res.status(200).json({ status: 'success', data: data });
            }
        }
    );
};

exports.RemoveTodo = (req, res) => {
    let id = req.body['_id'];

    TodoModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.SelectTodoStatus = (req, res) => {
    let UserName = req.headers['UserName'];
    let TodoStatus = req.body['TodoStatus'];

    TodoModel.find(
        { UserName: UserName, TodoStatus: TodoStatus },
        (err, data) => {
            if (err) {
                res.status(400).json({ status: 'fail', data: err });
            } else {
                res.status(200).json({ status: 'success', data: data });
            }
        }
    );
};

exports.SelectTodoDate = (req, res) => {
    let UserName = req.headers['UserName'];
    let FormDate = req.body['FormDate'];
    let ToDate = req.body['ToDate'];

    TodoModel.find(
        {
            UserName: UserName,
            TodoCreateDate: {
                $gte: new Date(FormDate),
                $lte: new Date(ToDate),
            },
        },
        (err, data) => {
            if (err) {
                res.status(400).json({ status: 'fail', data: err });
            } else {
                res.status(200).json({ status: 'success', data: data });
            }
        }
    );
};
