const jwt = require('jsonwebtoken');
const secret = "292a8848-e2c7-11e9-81b4-2a2ae2dbcce4";
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./db');

exports.auth = (req, res, next) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!token) throw "Token is missing";
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        let data = jwt.verify(token, secret);
        let user = localStorage.getItem(data.email);
        if (!user) throw "Invalid token";
        next();
    }
    catch (e) {
        res.status(401).send({ error: "Unauthorized Access", stack: e });
    }
}