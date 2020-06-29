"use strict";

const {mongoDBUrl} = require("../../constants");

//Configuration variables
const port = process.env.PORT || '3000';
const mongoURI = process.env.MONGODB_URI || mongoDBUrl;
const JwtSecret = process.env.JWT_SECRET || 'gpZZDw7725uhLCqnr7NsHeDY8L4Xht'; // TODO change when live

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};
