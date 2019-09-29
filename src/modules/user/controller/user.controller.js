const { cryptPassword, comparePassword } = require("../../../helper/bcrypt.js")
const LocalStorage = require('node-localstorage').LocalStorage;
const jwt = require('jsonwebtoken');
const localStorage = new LocalStorage('./db');
const { encryption, decryption } = require("../../../helper/crypto.js");
const secret = "292a8848-e2c7-11e9-81b4-2a2ae2dbcce4";

exports.signUp = async (req, res) => {
    try {
        let data = req.body;
        if (!data.email || !data.password) throw "Email/Password is required";
        let user = localStorage.getItem(data.email);
        if (user) throw "Email is already registered";
        data.password = await cryptPassword(data.password);
        localStorage.setItem(data.email, JSON.stringify(data));
        let token = jwt.sign({ email: data.email }, secret);
        return res.status(200).send({ token: token, message: "Successfully register" });
    }
    catch (e) {
        return res.status(400).send(errorObj(e));
    }
}

exports.login = async (req, res) => {
    try {
        let data = req.body;
        let user = JSON.parse(localStorage.getItem(data.email));
        if (!user) throw "User is not found";
        let passMatch = await comparePassword(data.password, user.password);
        if (!passMatch) throw "Invalid Password";
        let token = jwt.sign({ email: user.email }, secret);
        delete user.password;
        return res.status(200).send({ result: user, token: token, message: "Successfully logged in user" });
    } catch (e) {
        return res.status(400).send(errorObj(e));
    }
}

exports.chatPost = async (req, res) => {
    try {
        let data = req.body;
        data.time = new Date();
        let message = JSON.parse(localStorage.getItem("message")) || [];
        data.msg = encryption(data.msg);
        message.push(data);
        localStorage.setItem("message", JSON.stringify(message));
        return res.status(200).send({ encryptedMessage: data.msg, result: "message saved" });
    } catch (e) {
        return res.status(400).send(errorObj(e));
    }
}

exports.chatGet = async (req, res) => {
    try {
        let user1 = req.query.user1;
        let user2 = req.query.user2;
        let chat = JSON.parse(localStorage.getItem("message"));
        let result = chat.filter(v => {
            if ((v.to == user1 && v.from == user2) || (v.to == user2 && v.from == user1)) {
                v.msg = decryption(v.msg);
                return v;
            }
        })
        return res.status(200).send({ result: result, message: "success" })
    } catch (e) {
        return res.status(400).send(errorObj(e));
    }
}
const errorObj = e => {
    return { error: "Something went wrong", stack: e };
}