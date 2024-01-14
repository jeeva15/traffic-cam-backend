"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToTimestamp = void 0;
const dateToTimestamp = (dateTime) => {
    return Date.parse(dateTime) / 1000;
};
exports.dateToTimestamp = dateToTimestamp;
//# sourceMappingURL=utils.js.map