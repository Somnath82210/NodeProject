'use strict'

const LoginService = require('../../../services/login.service.js');
const db_config = require('../../../config/config.js');
const loginController = {}


loginController.createUser = async function (req, res) {
    try {

        let moduleData = req.body;
        let details = await LoginService.createUser(moduleData)
        if (details.success === true) {
            return res.status(200).send(details)
        } else {
            return res.status(404).send(details)
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error" })
    }
}

loginController.login = async function (req, res) {
    try {
        console.log("DB CONFIG", db_config.DEFAULT_DB)
        let moduleData = {
            data: req.body,
            clientIp: (req.headers['x-forwarded-for'] || '').split(',').shift() || req.socket.remoteAddress || null
        }
        console.log("CLIENT IP ADDRESS IS HERE", moduleData.clientIp)
        let details = await LoginService.login(moduleData)
        if (details.success === true) {
            return res.status(200).send(details)
        } else {
            console.log("Username or password is wrong")
            return res.status(404).send(details)
        }
    } catch (error) {
        console.log("error in controller", error)
        return res.status(500).json({ success: false, message: "Error in login" })
    }
}
loginController.authVerify = async function (req, res) {
    try {
        let { authorization } = req.headers;
        let internal = req.body.internal;
        let details = await LoginService.authVerify(authorization, internal)
        if (details.success === true) {
            return res.status(200).send(details)
        } else {
            return res.status(404).send(details)
        }
    } catch (error) {
        console.log("this error generated from auth verify controller", error)
        return res.status(500).json({ success: false, message: "Invalid Token" })
    }
}
loginController.logout = async function (req, res) {
    try {
        let authHeader = req.headers["authorization"];
        let details = await LoginService.logout(authHeader)
        if (details.success === true) {
            return res.status(200).send(details)
        } else {
            return res.status(404).send(details)
        }
    } catch (err) {
        console.log("error in logout", err)
        return res.status(500).json({ success: false, message: "failed" })
    }
}

module.exports = loginController;
