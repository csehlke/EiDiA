"use strict";

//Configuration variables
const port = process.env.PORT || '3000';
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EiDiA-db';
const JwtSecret = process.env.JWT_SECRET || 'gpZZDw7725uhLCqnr7NsHeDY8L4Xht';

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};