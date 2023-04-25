'use strict'

const userSchema = require('../model/user/user.schema')
const mongoose = require('mongoose')
const db_config = require('../config/config')
const jwt = require('jsonwebtoken')
let service = {}


service.createUser = async (moduleData) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            let connection = mongoose.createConnection(db_config.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            let db = connection.useDb(db_config.DEFAULT_DB||'test');
            let userModel = db.model('users', userSchema);
            moduleData._created_date = new Date()
           console.log(moduleData)
            let action = new userModel(moduleData);
            await action.save((err, result) => {
                if (err) {
                    connection.close()
                    resolve({ success: false })
                }
                console.log(result)
                resolve({ success: true, message: "user created", data: { id: result._id, name: result.username } })
            })
        } catch (error) {
            console.log(error)
            reject({ success: false, message: "error here" })
        }
    })
}


service.login = async (moduleData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let jwtSecretKey = db_config.JWTsecretkey;
            if (moduleData.data.username && moduleData.data.password) {
                let connection = mongoose.createConnection(db_config.DB_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                let db = connection.useDb(db_config.DEFAULT_DB);
                let userModel = db.model('users', userSchema);
                console.log(moduleData.data)
                let cond = {
                    username: moduleData.data.username,
                    password: moduleData.data.password,
                    _deleted: false
                }
                await userModel.find(cond, {}, async (err, result) => {
                    if (err) {
                        console.log(err);
                        connection.close()
                        resolve({ success: false, message: "error" })
                    }
                    console.log(result)
                    if(result.length>0 && typeof result !== 'undefined'){
                    let tokenData = {
                        userid: result[0]._id,
                        username: result[0].username,
                    }
                    await jwt.sign(tokenData, jwtSecretKey, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            console.log(err)
                            connection.close()
                            resolve({ success: false, message: "something went wrong in token", data: err })
                        } else {
                            connection.close()
                            resolve({ success: true, message: "login success", data: { auth_token: token, uid: result[0]._id, username: result[0].username } })
                        }
                    })
                } else {
                    connection.close()
                    resolve({success:false, message:"Authentication failed (username or password wrong)"})
                }
                })
            } else {
                resolve({ success: false, message: "Please enter proper credentials" })
            }

        } catch (error) {
            console.log("error from login service ", error)
            reject({ success: false, message: "went wrong in service", data: error })
        }
    })
}

service.authVerify = async function (authorization) {
    return new Promise(async (resolve, reject) => {
        try {

            let token = authorization.split(' ')[1];
            let jwtSecretKey = db_config.JWTsecretkey;
            let verification = jwt.verify(token, jwtSecretKey)
            let userID = verification.id;
            let payload;
            if (internal === true) {
                payload = {
                    success: true,
                    userid: userID,
                    message: 'Valid token'
                }
            } else {
                payload = {
                    status: true,
                    message: 'Valid token'
                }
            }
            resolve({ success: true, data: payload })
        } catch (error) {
            console.log("error from auth verify", error)
            reject({ success: false, message: "Invalid token" })
        }
    })
}

service.logout = async function (authHeader) {
    return new Promise(async (resolve, reject) => {
        try {
            await jwt.sign(authHeader, "HII", { expiresIn: 1 }, (logout, err) => {
                if (logout) {
                    resolve({ success: true, message: "logout success", data: logout })
                } else {
                    console.log("error in logout", err)
                    resolve({ success: false, message: "logout failed" })
                }
            })
        } catch (error) {
            console.log("errr in logout service", error)
            reject({ success: false, message: "error in logout service", data: error })
        }
    })
}

module.exports = service;

