"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (min, max) => Math.floor(min + Math.random() * ((max - min) + 1));
exports.random = random;
