const ProfileModel = require('../models/ProfileModel');
const jwt = require('jsonwebtoken');

exports.CreateProfile = (req, res) => {
    let reqBody = req.body;

    ProfileModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.UserLogin = (req, res) => {
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];

    ProfileModel.find(
        { UserName: UserName, Password: Password },
        (err, data) => {
            if (err) {
                res.status(400).json({ status: 'fail', data: err });
            } else {
                if (data.length > 0) {
                    const payload = {
                        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                        data: data[0],
                    };
                    const token = jwt.sign(payload, 'secretKey2022');

                    res.status(200).json({
                        status: 'success',
                        token,
                        data: data[0],
                    });
                } else {
                    res.status(401).json({ status: 'unauthorized', data: err });
                }
            }
        }
    );
};

exports.SelectProfile = (req, res) => {
    let UserName = req.headers['UserName'];

    ProfileModel.find({ UserName: UserName }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.UpdateProfile = (req, res) => {
    let UserName = req.headers['UserName'];
    let reqBody = req.body;

    ProfileModel.updateOne(
        { UserName: UserName },
        { $set: reqBody },
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
