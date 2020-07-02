"use strict";

const checkBodyForAttribute = (req, attribute) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, attribute)) {
        return 'The request body must contain a ' + attribute + ' property';
    }
}

module.exports = {
    checkBodyForAttribute,
}
