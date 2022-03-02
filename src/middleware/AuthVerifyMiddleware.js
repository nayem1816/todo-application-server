const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token-key'];

    jwt.verify(token, 'secretKey2022', (err, decoded) => {
        if (err) {
            res.status(400).json({ status: 'authorized', data: err });
        } else {
            let UserName = decoded['data']['UserName'];
            req.headers.UserName = UserName;
            next();
        }
    });
};
