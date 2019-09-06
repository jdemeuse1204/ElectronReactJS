"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = window.require('fs');
exports.info = (message) => {
    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toTimeString()}`;
    write(`INFO - ${formattedDate} - ${message} \r\n`);
};
const write = (line) => {
    fs.appendFile('log.txt', line, 'ascii', (err) => {
        if (err) {
            throw err;
        }
    });
};
//# sourceMappingURL=logging.js.map