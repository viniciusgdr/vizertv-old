"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getstr = void 0;
const getstr = (string, start, end, i) => {
    i++;
    var str = string.split(start);
    var str = str[i].split(end);
    return str[0];
};
exports.getstr = getstr;
