'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dictionary = require('./dictionary.json')

const dbSchema = {}

let obj = dictionary.field_defs
Object.keys(obj).forEach(function (k) {
    if (Object.keys(obj[k]['db_fields']).length > 0) {
        dbSchema[k] = obj[k]['db_fields']
    }
})

const model = new Schema(dbSchema, { collation: { locale: 'en_US', strength: 1 }, versionKey: false })

module.exports = model;