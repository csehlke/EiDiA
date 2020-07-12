"use strict";

import React from 'react';

let CompareTypes = [
    {type: 'text', name: 'is equal to', id: 101, fields: 1},
    {type: 'text', name: 'begins with', id: 102, fields: 1},
    {type: 'text', name: 'ends with', id: 103, fields: 1},

    {type: 'date', name: 'is equal to', id: 201, fields: 1},
    {type: 'date', name: 'before', id: 202, fields: 1},
    {type: 'date', name: 'after', id: 203, fields: 1},
    {type: 'date', name: 'between', id: 204, fields: 2},

    {type: 'number', name: 'is equal to', id: 301, fields: 1},
    {type: 'number', name: 'greater than', id: 302, fields: 1},
    {type: 'number', name: 'greater than or equal to', id: 303, fields: 1},
    {type: 'number', name: 'less than', id: 304, fields: 1},
    {type: 'number', name: 'less than or equal to', id: 305, fields: 1},
    {type: 'number', name: 'between', id: 306, fields: 2},
];

export default CompareTypes;
